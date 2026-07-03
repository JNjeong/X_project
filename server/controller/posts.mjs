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

// 포스트 수정
export async function updatePost(req,res) {
    const {text} = req.body
    const postid = req.params.postid
    const userid = req.query.userid

    if (!text || text.trim() ===""){
        return res.status(401).json({message: "내용을 입력해주세요"})
    }
    const data = await postRepository.updatePost(text, postid)
    console.log("###LOG: ",data)
    if(data.modifiedCount === 1){
        // res.status(200).json(data)
        res.status(200).json({message: "수정 완료"})
    } else { 
        res.status(404).json({message:"업데이트 실패"})
    }
}

// 포스트 삭제
export async function deletePost(req, res) {
    const postid = req.params.postid
    const post = await postRepository.getPostById(id)

    if(!post){
        return res.status(404).json({message:`${id}의 포스트가 없습니다`})
    }
    if (post.idx !== req.id){
        return res.sendStatus(403)
    }
    // res.sendStatus(204) //정상적인 삭제지만 보낼 메세지가 없는 경우
    const data = await postRepository.deletePost(postid)
    // console.log("###LOG: ",data)
    if (data.deletedCount === 1){
        // res.status(200).json(data)
        res.status(200).json({message: "성공적으로 삭제 완료됬습니다."})
    } else { 
        res.status(404).json({message:"삭제 실패"})
    }
}
