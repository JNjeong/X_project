import * as postRepository from "../data/posts.mjs"



// 포스트를 작성하는 함수
export async function createPost(req, res){
    const {text} = req.body
    const post = await postRepository.create(text, req.id)
    res.status(201).json(post)
}

// 모든 포스트를 가져오는 함수
export async function getPosts(req,res) {
    const userid = req.query.userid
    const data = await (userid? postRepository.getAllByUserid(userid): postRepository.getAll())
    res.status(200).json(data)
}

// 글번호에 대한 포스트 가져오기
export async function getPost(req, res) {
    const postid = req.params.postid
    // console.log("###LOG: ",postid)
    const data = await postRepository.getPostById(postid)
    // console.log(data)
    if (data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `${id}에 대한 포스트가 없습니다.`})
    }
} 