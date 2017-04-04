function StartScreenRenderer(ctx) {
    m_ctx = ctx;

    var frameCounter = 0;

    this.renderScreen = function (tileSize) {
        /* Fill canvas with black color */
        m_ctx.globalCompositeOperation = "source-over";
        m_ctx.fillStyle = "rgba(0,0,0,1)";
        m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);

        m_ctx.fillStyle = "rgba(255,255,255,1)";
        m_ctx.font = tileSize + "px Arial";
        m_ctx.fillText("CHARACTER",8 * tileSize,14 * tileSize);
        m_ctx.fillText("NICKNAME",19 * tileSize,14 * tileSize);
        m_ctx.fillStyle = "rgba(200,200,00,1)";
        m_ctx.font = 4 * tileSize + "px Arial";
        m_ctx.fillText("PAC MAN",7 * tileSize,10 * tileSize);
        m_ctx.fillText("PAC MAN",7.2 * tileSize,10 * tileSize);
        m_ctx.fillText("PAC MAN",7.4 * tileSize,10 * tileSize);

        m_ctx.fillStyle = "rgba(255,255,255,1)";
        m_ctx.font = tileSize + "px Arial";


        if (Math.floor(frameCounter / 10) % 2 === 0) {
            m_ctx.font = tileSize + "px Arial";
            m_ctx.fillText("---- Press SPACEBAR ----", 10 * tileSize, 33 * tileSize);
            m_ctx.fillText("---- Press SPACEBAR ----", 10.1 * tileSize, 33 * tileSize);
        }

        m_ctx.font = tileSize/2 + "px Arial";
        m_ctx.fillText("Copyright (c) 2017 JKW",13 * tileSize,35 * tileSize);

        frameCounter++;
    }
}