export const userSchema = {
    name: "users",
    type: "document",
    title: "Users",
    fields: [{
            name: "name",
            type: "string",
            title: "Name",
        },
        {
            name: "walletAddress",
            type: "string",
            title: "Wallet Address",
        },
        {
            name: "profileImage",
            type: "image",
            title: "Profile Image",
        },
        {
            name: "age",
            type: "number",
            title: "Age",
        },
        {
            name: "likes",
            type: "array",
            title: "Likes",
            of: [{ type: "reference", to: { type: "users" } }],
        },
    ],
};