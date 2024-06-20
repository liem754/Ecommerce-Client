import { memo } from "react";
import { Parallax } from "react-parallax";
function ParallaxItem({ img, content }) {
    return (
        <Parallax
            bgImage={img}
            bgImageAlt="the cat"
            strength={200}
            className="h-[400px] flex justify-center items-center">
            <div className="text-white">{content}</div>
        </Parallax>
    );
}

export default memo(ParallaxItem);
