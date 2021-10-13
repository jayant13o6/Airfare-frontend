import { Button } from 'bootstrap';
import GoogleLogin from  'react-google-login';
<GoogleLogin
    clientId=''
    //styling of button
    render={(renderProps)=>(
    <Button className={classes.googleButton} color='primary'
     onclick={render.Props.onclick} 
     disabled={renderProps.disabled} startIcon={<Icon/>}
     variant='contained'>
    </Button>)}
/>