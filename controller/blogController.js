const Blog = require("../models/blog");

const getCreateBlog = async (req,res) =>{
	res.render('createBlog');
}

const postCreateBlog = async (req,res)=>{
	const blog = new Blog(req.body);
	blog.save().then(result=>{
		res.redirect('/blogs');
	}).catch(err=>console.log(err));
}

const getBlogs = async (req,res)=>{
	const blogs = Blog.find()
	.then((results)=>{
		res.render('blogs',{blogs : results,title:"All Blogs"});
	})
	.catch(err=>console.log(err));
}

const getBlogDetail = async (req,res)=>{
	const blog = await Blog.findById(req.params.id);
	res.render('blog',{blog , title:"Blog | CF-Contest"});
}

const deleteBlog = async (req,res)=>{
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
	.then((results)=>{
		res.json({ redirect:'/blogs'})
	})
	.catch(err=>console.log(err));
}

module.exports ={
    getCreateBlog,
    getBlogs,
    getBlogDetail,
    postCreateBlog,
    deleteBlog
}