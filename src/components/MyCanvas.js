import React, { useCallback, useEffect, useRef, useState } from 'react'

function MyCanvas() {

    const [penColor, setPenColor] = useState("black");
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    const [images, setImages] = useState("");
    const [penWidth, setPenWidth] = useState(10);

    const canvasRef = useRef(null);
    const ctx = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            ctx.current = canvasRef.current.getContext('2d');
        }

    }, [])

    const draw = useCallback((x, y) => {
        if (mouseDown) {
            ctx.current.beginPath();
            ctx.current.strokeStyle = penColor;
            ctx.current.lineWidth = penWidth;
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(lastPosition.x, lastPosition.y);
            ctx.current.lineTo(x, y);
            ctx.current.closePath();
            ctx.current.stroke();
            setLastPosition({
                x,
                y
            })
        }
    }, [lastPosition, mouseDown, penColor,penWidth, setLastPosition]);

    // {
    //     images.forEach((imgURL,index)=>{
    //         return (
    //             <img src={imgURL} key={index} alt="Error occured"/>
    //         )
    //     })
    // }
    console.log(mouseDown);
    return (
        <>
            <div className='flex'>

                <div className='w-1/4'>
                    <div className='overflow-scroll w-full border-4 my-4 mx-2' style={{ height: "100%" }}>
                        <img  src={images} alt="" />
                    </div>
                    <label className='text-center mx-24 mt-6 border-4 border-indigo-700 bg-indigo-500 text-white'>
                        <input className='hidden' type="file" id="input-file" 
                        onChange={(event)=>{
                            const [file]=event.target.files;
                            setImages(URL.createObjectURL(file));
                        }} 
                        />
                        <span id="selectedFileName">Upload Image</span>
                    </label>
                </div>

                <div className='ml-auto w-2/3 my-4'>

                    <div className='flex'>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <div onClick={() => { setPenColor("red"); setPenWidth(2); }} className='border-2 h-5 w-5 bg-red-500 '></div>
                        <div onClick={() => { setPenColor("blue"); setPenWidth(2); }} className='border-2 h-5 w-5 bg-blue-500 '></div>
                        <div onClick={() => { setPenColor("black"); setPenWidth(2); }} className='border-2 h-5 w-5 bg-black '></div>
                        <div onClick={() => { setPenColor("green"); setPenWidth(2); }} className='border-2 h-5 w-5 bg-green-500 '></div>
                        <svg onClick={() => { setPenColor("white"); setPenWidth(20) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eraser-fill ml-auto mx-72" viewBox="0 0 16 16">
                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                        </svg>

                    </div>

                    <canvas className='border-4'
                        width={window.innerWidth * 0.5}
                        height={window.innerHeight * 0.75}
                        ref={canvasRef}
                        onMouseMove={event => { draw(event.pageX - canvasRef.current.offsetLeft, event.pageY - canvasRef.current.offsetTop) }}
                        onMouseUp={() => { setMouseDown(false); }}
                        onMouseDown={(event) => {
                            setLastPosition({
                                x: event.pageX - canvasRef.current.offsetLeft,
                                y: event.pageY - canvasRef.current.offsetTop
                            })
                            setMouseDown(true);
                        }}
                        onMouseLeave={() => { setMouseDown(false); }}
                    />
                </div>
            </div>
        </>
    )
}

export default MyCanvas