import FacebookLogin from 'react-facebook-login';

export const ButtonFacebook = () => {

    const responseFacebook = (response) => {
        console.log(response.name, response.email, response.picture.data.url);

    }

    // const componentClicked = () => {
    //     //se agregaria informacion a la cookie 
    // }

    return (
        <FacebookLogin
            appId="323151842756210"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            // icon="fa-facebook"
            size="medium"
            textButton="Facebook"

        />
    )
}