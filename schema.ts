import { list } from "@keystone-6/core";
import { text, relationship, password, timestamp, select, image, file } from "@keystone-6/core/fields";

import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";
import { CareerSchema } from "./schema/career.schema";
import { ProductSchema } from "./schema/product.schema";
import { ContactSchema } from "./schema/contact.schema";

// User Form
export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "posts"],
      },
    },
  }),
  // Landing Page Form
  LandingPage: list({
    fields: {
      headerLogo: image({ storage: "my_local_images" }),
      visi: text(),
      misi: text(),
      about: document({
        formatting: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
      portofolio: document({
        formatting: true,
      }),
    },
  }),

  Apply: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      telpon: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true } }),
      university: text({ validation: { isRequired: true } }),
      programStudy: text({ validation: { isRequired: true } }),
      cv: file({ storage: "my_s3_files" }),
    },
  }),

  // Post Form
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true,
        },
      }),
      tags: relationship({
        ref: "Tag.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
        many: true,
      }),
    },
  }),

  /* Carrer Schema */
  Career: list(CareerSchema),

  /** product schema */
  Product: list(ProductSchema),

  Contact: list(ContactSchema),

  // Tag Form
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: "Post.tags", many: true }),
    },
  }),
};
