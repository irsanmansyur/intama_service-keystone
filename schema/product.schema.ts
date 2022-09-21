import { image, text } from "@keystone-6/core/fields";

export const ProductSchema = {
  fields: {
    gambar: image({ storage: "my_local_images" }),
    name: text(),
    description: text(),
  },
};
