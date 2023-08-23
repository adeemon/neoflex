import * as React from 'react';
import { ReactComponent as Opened } from '../../assets/images/design/Expand_down.svg';
import { ReactComponent as Closed } from '../../assets/images/design/Expand_up.svg';

interface IAccodeonProps {
    summary: string,
    content: string,
}

export const Accorderon: React.FC<IAccodeonProps> = ({summary, content}) => {

    const [isChecked, setIsChecked] = React.useState(false);

    const onClick = () => {
        setIsChecked(!isChecked);
    }

    React.useEffect(()=> {
        console.log(isChecked);
    })

    return (
        <div className='accordeon'>
            <div className="accordeon__summary-container" onClick={onClick}>
                <p className='accordeon__summary'>
                    {summary}
                </p>
                <div className="accordeon__icon">
                    {isChecked ? 
                        <Closed />
                    :   <Opened />
                }
                </div>
            </div>
            {isChecked ? 
                (<p className='accordeon__content'>
                    {content}
                </p>)
                : ''
            }
            
        </div>
    )
}