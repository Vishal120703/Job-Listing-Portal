exports.getProfile=(req,res)=>{
    const userId = req.user.id;
    return res.status(200).json({msg:userId});
}
exports.postProfileDetails=(req, res) => {
    try {
      console.log(req.file);
      res.json({
        file: req.file,
        message: "File uploaded successfully"
        
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}