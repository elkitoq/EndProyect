import { GoogleLogin } from 'react-google-login';

export const ButtonGoogle = () => {

    const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
        //se agregaria informacion a la cookie usando el response.profileObj que da mas datos sobre el usuario
    }

    return (
        <GoogleLogin

            clientId="1095958975836-nnf32pq1spueun0hcgmjajiaf3q5s39s.apps.googleusercontent.com"
            render={renderProps => (
                < button className="butonLoginGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled} > Google </button>
            )}
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
