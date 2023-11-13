//node imports
import {memo} from 'react'
import { useDispatch } from 'react-redux'

//local imports
import SettingAction from '../../store/setting/actions'
import { theme_color } from "../../store/setting/actions";


const RadioBtn = memo((props) => {
    const dispatch = useDispatch();
    const radioCheckValue = (selector,value) => {
        if(selector === value) {
            return true
        }
        return false
    }
    return (
        <div className={`${props.className}`}   >
            <input type="radio" value={props.value} className="btn-check" name={props.btnName} id={props.id}  autoComplete="off" defaultChecked={radioCheckValue(props.defaultChecked, props.value)} onClick={() => 
            { 
                props.value === 'dark' ? (dispatch(SettingAction[props.btnName](props.value)) && dispatch(theme_color({ value: 'theme-color-blue', colors: {"--{{prefix}}primary": "#71AD44","--{{prefix}}info": "#015C99",} }))) : (dispatch(SettingAction[props.btnName](props.value)) && dispatch(theme_color({ value: 'theme-color-blue', colors: {"--{{prefix}}primary": "#015C99","--{{prefix}}info": "#71AD44",} }))) 
            
            } 
                } />
            <label className={`btn btn-border  ${props.labelclassName}`} htmlFor={props.id}>
                {props.children}
            </label>
            {props.imgComponent ? <span className="mt-2"> {props.label || ''} </span> : ''}
        </div>
    )
})

RadioBtn.displayName = 'RadioBtn'
export default RadioBtn