const IMGBB_API_KEY = '76188552c6fc6bf4a3912664a291870a';

export interface ImgBBResponse {
  success: boolean;
  data: {
    url: string;
    display_url: string;
    thumb: {
      url: string;
    };
    medium?: {
      url: string;
    };
    delete_url: string;
  };
  error?: {
    message: string;
  };
}

export async function uploadToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const result: ImgBBResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to upload image');
  }

  return result.data.display_url;
}

export async function uploadMultipleToImgBB(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadToImgBB(file));
  return Promise.all(uploadPromises);
}
