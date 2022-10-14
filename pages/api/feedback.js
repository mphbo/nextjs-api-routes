import fs from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(buildFeedbackPath());
  const data = JSON.parse(fileData);
  return data;
};

function handler(req, res) {
  const routes = {
    GET: () => {
      const data = extractFeedback(buildFeedbackPath());
      res.status(201).json({ message: "Success!", feedback: data });
    },
    POST: () => {
      const { email, text } = req.body;

      const newFeedback = {
        id: new Date().toISOString(),
        email,
        text,
      };

      const data = extractFeedback(buildFeedbackPath());
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));
      return res
        .status(201)
        .json({ message: "Success!", feedback: newFeedback });
    },
  };
  routes[req.method]();
}
export default handler;
