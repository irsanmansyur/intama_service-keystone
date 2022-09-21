import { text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const CareerSchema = {
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: document({
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
    Requirements: document({
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
    created_at: timestamp(),
  },
};
