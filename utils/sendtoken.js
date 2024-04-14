exports.sendToken = (studentuser, statuscode, res) => {
  const token = studentuser.getjwttoken();

  const options = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, id: studentuser._id, token });
};
