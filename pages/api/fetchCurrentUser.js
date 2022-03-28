import { client } from "../../lib/sanity";

const getUserInfo = async(req, res) => {
    try {
        const query = `
         *[_type == "users" && _id == "${req.query.activeAccount}"]{
             name,
             walletAddress,
             "imageUrl": profileImage.asset->url,
             likes
         }
        `;

        const sanityResponse = await client.fetch(query);
        res.status(200).send({ message: "success", data: sanityResponse[0] });
    } catch (error) {
        res.status(200).send({ message: "error", data: error.message });
    }
};

export default getUserInfo;