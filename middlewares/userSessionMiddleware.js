
export const userSessionMiddleware = async (ctx, next) => {
    const user = await ctx.state.session.get("user"); // Retrieve user from session
    ctx.state.user = user || null; // Attach user to context state
    await next(); // Proceed to the next middleware or route
};