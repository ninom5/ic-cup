import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType } from "types/index";

const uploadFiles = async (file: File[]) => {
  if (!Array.isArray(file) || file.length < 2) {
    toast.error("Morate dodati dokumente");
    return null;
  }

  const formData = new FormData();

  file.forEach((f) => formData.append("pdfs", f));

  const response = await api.post<File[], CloudinaryFileResponseType[]>(
    `/cloudinary/upload/raw`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const useUploadFiles = () => {
  return useMutation<CloudinaryFileResponseType[] | null, Error, File[]>({
    mutationFn: uploadFiles,
    onError: (error) => {
      toast.error("Greška prilikom dodavanja datoteka");
      console.error(error);
    },
  });
};
