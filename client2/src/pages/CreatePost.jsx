import React from "react";
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

// function MyComponent() {
//   const [value, setValue] = useState("");

//   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }

export default function CreatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imageLoadbar, setImageLoadbar] = useState(null);
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!imageFile) {
        setImageFileUploadError("请选择图片");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const loadbar =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageLoadbar(loadbar.toFixed(0));
        },
        (error) => {
          setImageLoadbar(null);
          setImageFileUploadError("上传失败");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageLoadbar(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
            // console.log("fuckyou");
          }),
            (error) => {
              console.log(error);
            };
        }
      );
    } catch (error) {
      setImageFileUploadError("图片上传失败");

      setImageLoadbar(null);
    }
  };
  //   console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        console.log(res);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("There is something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">创建帖子</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Title"
            required
            id="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            {/* <option value="无主题">无主题</option> */}
            <option value="随笔">随笔</option>
            <option value="杂谈">杂谈</option>
            <option value="知识">知识</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-emerald-500 border-double p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone={"tealToLime"}
            size={"sm"}
            content=""
            outline
            onClick={handleUploadImage}
            disabled={imageLoadbar}
          >
            {imageLoadbar ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageLoadbar}
                  text={`${imageLoadbar || 0}%`}
                ></CircularProgressbar>
              </div>
            ) : (
              "上传图片"
            )}
          </Button>
        </div>
        {ImageFileUploadError && (
          <Alert color={"failure"}>{ImageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-contain"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="欢迎回来，想写些什么？"
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          发布
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
