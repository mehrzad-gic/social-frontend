async function index(req, res, next) {
    const { model, page, limit, id } = req.query;

    if(!ALLOWED_MODELS.includes(model)) throw new createHttpError.BadRequest('model is not allowed')

    try {
        const pageNumber = parseInt(page) || 1;
        const pageLimit = parseInt(limit) || 20;
        const offset = (pageNumber - 1) * pageLimit;

        // conditions
        const conditions = {
            where: {
                commentable_id: id,
                commentable_type: model.toLowerCase()
            },
            attributes: [
                "id",
                "text",
                "createdAt",
                "likes",
                "status",
                "commentable_id",
                "commentable_type",
                "parent_id",
                "deep"
            ],
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "slug", "email", "img", "title"]
                },
            ],
            order: [
                ["createdAt", "DESC"]
            ],
            limit: pageLimit,
            offset: offset
        }

        const comments = await Comment.findAll(conditions);

        const comment_likes = await CommentLike.findAll({
            where: {
                user_id: req.session.user.id
            }
        });

        res.json({
            success: true,
            comment_likes,
            comments,
            message: "Comments fetched successfully"
        });

    } catch (error) {
        next(error);
    }
} 