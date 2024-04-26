import axios from "axios";

export const uploadImage = async event => {
    try {
        const image = await getImage(event);
        if (!image) return null;

        const formData = new FormData();
        formData.append('image', image, image.name);
        const response = await axios.post('/api/upload', formData);
        return response.data.image;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const getImage = async event => {
    const files = event.target.files;

    if (!files || files.length <=0) {
        return null;
    }

    const file = files[0];

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return null;
    }

    const blob = new Blob([file], { type: file.type, name: file.name });

    return blob;

}