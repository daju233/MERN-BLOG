import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { TextInput, Button, Alert, Modal } from "flowbite-react";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userslice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [loadbar, setLoadbar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUploading, setImageUploading] = useState(null);
  const dispatch = useDispatch();
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read, write: if request.resource.size<2*1024*1024
    //       &&request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadbar(progress.toFixed(0));
      },
      (error) => {
        setLoadbar(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadError("请上传大小小于2MB的文件");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setFormData({ ...formData, profileImage: downloadUrl });
            setImageUploading(false);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        toast("资料更新成功", {
          icon: "🎉",
        });
        setFormData({});
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          name=""
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />
        <div
          className="relative self-center w-32 h-32"
          onClick={() => filePickerRef.current.click()}
        >
          {loadbar && (
            <CircularProgressbar
              value={loadbar || 0}
              text={`${loadbar}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(${loadbar * 2.55 * Math.random()},${
                    loadbar * 2.55 * Math.random()
                  },${loadbar * 2.55 * Math.random()},${loadbar / 10})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profileImage}
            className={`overflow-hidden rounded-full w-full h-full border-8 object-cover border-[lightgray] cursor-pointer shadow-md ${
              loadbar && loadbar < 100 && "opacity-60"
            }`}
            alt="user"
          />
        </div>
        {ImageFileUploadError ? (
          <Alert color="failure">{ImageFileUploadError}</Alert>
        ) : null}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={changeHandler}
        ></TextInput>
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={changeHandler}
        ></TextInput>
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          onChange={changeHandler}
        ></TextInput>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading}
        >
          {loading ? "上传中……" : "更新资料"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="redToYellow"
              className=" w-full"
            >
              创建帖子
            </Button>
          </Link>
        )}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
      </form>
      <div className="flex justify-center mt-4">
        <FiAlertTriangle className="text-red-600" size="24"></FiAlertTriangle>
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className=" font-semibold cursor-pointer text-red-600 hover:underline"
        >
          删除帐号
        </span>
        {/* <span className=" cursor-pointer text-red-600 hover:underline ">
          Sign Out
        </span> */}
      </div>
      <Modal
        className=""
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className=" text-center">
            <HiOutlineEmojiSad className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              您确定要删除该帐号吗？
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                确定
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                不，谢谢
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
