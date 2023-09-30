export const ping = async (req, res, next) => {
  return res.status(200).json("ping pong");
};
