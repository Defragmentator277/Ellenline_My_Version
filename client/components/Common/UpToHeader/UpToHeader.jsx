import classes from './UpToHeader.module.scss';
import Image from 'next/image';

function UpToHeader(props){
    
    
    const handleUpButton = () => {

        let current_scroll = props.scroll;
        let toUp = setInterval(()=>{

            if (current_scroll <= 0){
                clearInterval(toUp);
            }
            window.scrollTo(0, current_scroll = current_scroll - 40);

        }, 0.00000001)
        
    };
   

    return (<></>
    )
}

export default UpToHeader
