/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";

interface AvatarProps {
  src: string;
  width: number;
  height: number;
  onUpload: (file: File) => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, width, height, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <>
      <img
        src={src}
        //src={`../avatar/${post.userImg}`}
        alt=""
        width={width}
        height={height}
        onClick={handleAvatarClick}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default Avatar;
