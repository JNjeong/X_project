import MongoDB, { ObjectId, ReturnDocument } from "mongodb"
import * as userRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"

// 포스트를 작성
export async function create(text, id) {
    return userRepository.findById(id).then((user) => getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid
    })).then((result) => {
        return getPosts().findOne({ _id: result.insertedId })
    })
}

// 모든 포스트를 리턴
export async function getAll() {
    return getPosts().find().sort({createdAt: -1}).toArray()
}

// 사용자 아아디에 대한 포스트 리턴
export async function getAllByUserid(userid) {
    return getPosts().find({userid}).sort({createdAt:-1}).toArray()
}

// 글번호에 대한 포스트 리턴
export async function getPostById(postid) {
    return getPosts().find({_id: new ObjectId(postid)}).next().then(mapOptionalPost)
}

// 포스트 수정
export async function updatePost(text, postid) {
    return getPosts().findOneAndUpdate(
        { _id: new ObjectId(postid)},
        {$set:{text}},
        {returnDocument: "after"}
    ).then((result)=>result)
}

// 포스트삭제
export async function deletePost (postid) {
    return getPosts().deleteOne({_id: new ObjectId(postid)})
}

function mapOptionalPost(post){
    return post ? {...post, id:post._id.toString()}: post
}