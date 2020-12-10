const httpStatus = require('http-status');
const { HirePost } = require('../models');
const ApiError = require('../utils/ApiError');

const getHirePosts = async () => {
  // eslint-disable-next-line
  return await HirePost.find({});
};
const getHirePostbyd = async (id) => {
  // eslint-disable-next-line
  return await HirePost.findById(id);
};

const createHirePost = async (body) => {
  // eslint-disable-next-line
  return await HirePost.create(body);
};

const editHirePost = async (id, body) => {
  const post = await getHirePostbyd(id);
  if (!post) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  Object.assign(post, body);
  // eslint-disable-next-line
  return await post.save();
};

const deleteHirePost = async (id) => {
  // eslint-disable-next-line
  return await HirePost.findByIdAndRemove(id);
};

const hirePostStatus = async (id, status) => {
  const post = await getHirePostbyd(id);
  if (post) {
    if (status) {
      if (post.status === 'Activate') {
        throw new ApiError('post is already activate', httpStatus.BAD_REQUEST);
      } else {
        post.status = 'Activate';
        // eslint-disable-next-line
        return await post.save();
      }
    }
    if (post.status === 'Deactivate') {
      throw new ApiError('post is already deactivate', httpStatus.BAD_REQUEST);
    } else {
      post.status = 'Deactivate';
      // eslint-disable-next-line
      return await post.save();
    }
  }
  throw new ApiError('No post found in id', httpStatus.BAD_REQUEST);
};

module.exports = {
  getHirePosts,
  getHirePostbyd,
  createHirePost,
  editHirePost,
  deleteHirePost,
  hirePostStatus,
};
