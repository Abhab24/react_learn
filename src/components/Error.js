import { useRouteError } from "react-router-dom";

const Error = ()=>{
  const err = useRouteError();//this will give us all the errors in our path..recat router dom will catch all those errors and give it to us in foprm of of object in console
  console.log(err);//give us error object in console with info about the error

    return(//err. helps to display info from error object that we have in console
        <div>
            <h1>Oops!!</h1>
            <h2>Something went wrong !!</h2>
            <h3>
                {err.status} : {err.statusText}
            </h3>
        </div>
    )
}

export default Error;