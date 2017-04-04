function GameoverRenderer(ctx) {
    m_ctx = ctx;

    var frameCounter = 0;

    this.renderScreen = function (tileSize) {
        m_ctx.fillStyle = "rgba(255,255,255,1)";
        m_ctx.font = tileSize + "px Arial";
        m_ctx.fillText("--- GAME OVER ---", 10 * tileSize, 21 * tileSize);
        m_ctx.fillText("--- GAME OVER ---", 10.1 * tileSize, 21 * tileSize);
    }
}