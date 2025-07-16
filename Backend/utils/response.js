function sendResponse(res, statuscode, msg, data = null) {
  return (req, res) => {
    res.send(statuscode).json({ msg, data });
  };
}

export default sendResponse;
