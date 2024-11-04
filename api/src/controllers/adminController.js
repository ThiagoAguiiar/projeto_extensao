import sendStatus from "../utils/sendStatus";

const adminController = () => {
  return {
    admin: (req, res) => {
      return sendStatus(res, 200, "Hello Admin!");
    },
  };
};

export default adminController;
