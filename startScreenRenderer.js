function StartScreenRenderer(ctx, tileSize) {
    m_ctx = ctx;

    this.renderScreen = function () {
        /* Fill canvas with black color */
        m_ctx.globalCompositeOperation = "source-over";
        m_ctx.fillStyle = "rgba(0,0,0,1)";
        m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);
    }
}