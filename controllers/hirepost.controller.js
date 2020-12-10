const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { hirePostService } = require('../services');
const ApiError = require('../utils/ApiError');

const createHirePost = catchAsync(async (req, res) => {
  const post = await hirePostService.createHirePost(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', post });
});
const getHireposts = catchAsync(async (req, res) => {
  const post = await hirePostService.getHirePosts();
  if (!post) {
    throw new ApiError('No Post Found.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', post });
});

const getHirePostsbyId = catchAsync(async (req, res) => {
  const post = await hirePostService.getHirePostbyd(req.params.postId);
  if (!post) {
    throw new ApiError('No Post Found In  This Id.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', post });
});
const deleteHirePostsbyId = catchAsync(async (req, res) => {
  const post = hirePostService.getHirePostbyd(req.params.postId);
  if (!post) {
    throw new ApiError('No Post Found In  This Id.', httpStatus.BAD_REQUEST);
  }
  await hirePostService.deleteHirePost(req.params.postId);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});
const editHirePostsbyId = catchAsync(async (req, res) => {
  const post = await hirePostService.editHirePost(req.params.postId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', post });
});

const hirePostStatus = catchAsync(async (req, res) => {
  const id = req.params.postId;
  const { status } = req.body;
  const post = await hirePostService.hirePostStatus(id, status);
  return res.status(httpStatus.OK).json({ status: 'success', post });
});

module.exports = {
  createHirePost,
  getHireposts,
  getHirePostsbyId,
  deleteHirePostsbyId,
  editHirePostsbyId,
  hirePostStatus,
};
