import express from "express"
import { isAuth } from "../middleware/auth.mjs"
import * as postController from "../controller/posts.mjs"

const router = express.Router()

// 전체 포스트 조회
router.get("/", isAuth, postController.getPosts)

// 글번호에 대한 특정 포스트 조회
router.get("/:postid", isAuth, postController.getPost)

// 포스트 작성
router.post("/", isAuth, postController.createPost)

// 포스트 수정
router.put("/:postid", isAuth, postController.updatePost)

// 포스트 삭제
router.delete("/:postid", isAuth, postController.deletePost)

export default router