

export const LoginPage = () => {


    return (
        <>
            <div className="h-screen bg-indigo-700 flex justify-center items-center ">
                <div className="w-4/6 m-auto flex flex-col  lg:flex-row  py-50 justify-center gap-8 ">
                <div className="bg-white h-[250]  rounded-4xl p-6 outline-1 outline-amber-700 shadow-md shadow-amber-300">
                        <h3 className="p-4 text-center bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-4xl font-extrabold text-transparent
                         ">Ingreso</h3>
                        <form className="p-4  flex-column flex-1/3 ">
                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="text"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1  text-violet-700"
                                    placeholder="Correo"
                                />
                            </div>
                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="password"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1  text-violet-700"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="w-100 mx-auto  mb-4">
                                <input
                                    type="submit"
                                    className="block w-100 bg-radial from-10% bg-blue-200 hover:bg-cyan-200 to-blue-500 hover:to-cyan-900 text-blue-900 p-3 px-8 rounded-xl text-2xl 
                                     shadow-stone-400 shadow-lg border border-stone-600  hover:shadow-stone-600 hover:shadow-md  hover:border-stone-400 duration-150"
                                    value="Login"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="bg-white h-[250]  rounded-4xl p-6 outline-1 outline-amber-700 shadow-md shadow-amber-300">
                        <h3 className="p-4 text-center bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-4xl font-extrabold text-transparent
                         ">Registro</h3>
                        <form className="p-4  flex-column  ">
                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="text"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1 text-violet-700"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="email"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1  text-violet-700"
                                    placeholder="Correo"
                                />
                            </div>
                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="password"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1  text-violet-700"
                                    placeholder="Contraseña"
                                />
                            </div>

                            <div className="w-100 mx-auto mb-4">
                                <input
                                    type="password"
                                    className="w-100 p-4 rounded-lg placeholder:text-orange-300 placeholder:text-xl 
                                    border-stone-600 outline-blue-600 border hover:outline-1  text-violet-700"
                                    placeholder="Repita la contraseña"
                                />
                            </div>

                            <div className="w-100 mx-auto mb-4 ">
                                <input
                                    type="submit"
                                    className="block w-100 bg-radial from-10% bg-blue-200 hover:bg-cyan-200 to-blue-500 hover:to-cyan-900 text-blue-900 p-3 px-8 rounded-xl text-2xl 
                                    shadow-stone-400 shadow-lg border border-stone-600  hover:shadow-stone-600 hover:shadow-md  hover:border-stone-400 duration-150"
                                   value="Login"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}