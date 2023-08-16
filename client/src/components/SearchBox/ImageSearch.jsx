import { styled } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { IcUploadPurple, IcUploadWhite } from '../../assets/icons';
import { UploadedImage } from '../../recoil/atom';

export default function ImageSearch() {
  const [selectedImage, setSelectedImage] = useRecoilState(UploadedImage);
  const imageInputRef = useRef(null);
  const [URLThumbnail, setURLThumbnail] = useState(null);

  const handleFileSelect = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleFileBtnClick = () => {
    imageInputRef.current?.click();
  };

  const handleDeleteImage = (e) => {
    setSelectedImage(null);
    setURLThumbnail(null);
    handleFileBtnClick(e);
  };

  const createImageURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result);
      };
      reader.onerror = (event) => {
        reject(event.target?.error);
      };
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    if (selectedImage) {
      const fetchImageURL = async () => {
        const url = await createImageURL(selectedImage);
        console.log(url);
        setURLThumbnail(url);
      };
      fetchImageURL();
    }
  }, [selectedImage]);

  return (
    <StImageSearch>
      <input ref={imageInputRef} type="file" onChange={handleFileSelect} accept=".jpg,.png" />
      <StImageSearchBtn type="button" onClick={handleFileBtnClick}>
        <IcUploadPurple />
        <p>사진 업로드하기</p>
        <span>PNG, JPG 형식만 지원됩니다.</span>
      </StImageSearchBtn>
      {URLThumbnail && (
        <StThumbnail>
          <img src={URLThumbnail} alt="Uploaded Thumbnail" />
          <StDeleteButton onClick={handleDeleteImage}>
            <IcUploadWhite />
            <p>사진 재업로드하기</p>
            <span>PNG, JPG 형식만 지원됩니다.</span>
          </StDeleteButton>
        </StThumbnail>
      )}
    </StImageSearch>
  );
}

const StImageSearch = styled.div`
  position: relative;

  width: 100%;

  & > input {
    display: none;
  }
`;
const StImageSearchBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem 0;
  margin-bottom: 1.6rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Gray2};

  & > p {
    margin: 0.4rem 0 0.8rem 0;

    color: ${({ theme }) => theme.colors.main};
    ${({ theme }) => theme.fonts.Title2};
  }
  & > span {
    color: ${({ theme }) => theme.colors.Gray6};
    ${({ theme }) => theme.fonts.Body5};
  }
`;

const StThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  cursor: pointer;

  & > img {
    object-fit: cover;

    width: 100%;
    height: 15.3rem;

    border-radius: 1rem;
  }
  & > img:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
  }
`;

const StDeleteButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  width: 100%;
  height: 15.3rem;
  padding: 2rem 0;

  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.5);

  & > p {
    margin: 0.4rem 0 0.8rem 0;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title2};
  }
  & > span {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body5};
  }

  ${StThumbnail}:hover & {
    opacity: 1;
  }
`;
