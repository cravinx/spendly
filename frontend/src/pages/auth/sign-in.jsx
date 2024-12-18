import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import useStore from '../../store'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/Card'
import { Seperator } from '../../components/Seperator'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { BiLoader } from "react-icons/bi"
import { SocialAuth } from '../../components/SocialAuth'
import { toast } from 'sonner'
import api from '../../libs/apiCall'
import { RiCurrencyFill } from "react-icons/ri";
import { ThemeSwitch } from '../../components'
import {BackgroundImage} from '../../assets';

const LoginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})

const SignIn = () => {
    const { user, setCredentials } = useStore(state => state)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && navigate("/overview")
    }, [user]);
    const onSubmit = async (data) => {
        try {
            setLoading(true)

            const { data: res } = await api.post("/auth/sign-in", data)
            
            if (res?.user) {
                toast.success(res?.message);

                const userInfo = { ...res?.user, token: res.token }
                localStorage.setItem("user", JSON.stringify(userInfo))
                setCredentials(userInfo)

                setTimeout(() => {
                    navigate("/overview");
                }, 500);
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    };

  return (
      <div className='flex items-center justify-center w-full min-h-screen py-10 bg-violet-100 dark:bg-violet-900 transition-colors duration-300 bg-cover bg-blend-overlay'
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
          <div className="fixed right-5 md:right-10 top-[25%]">
        <ThemeSwitch/>
      </div>

          <Card className="w-[400px] bg-violet-100 dark:bg-violet-900 dark:border-violet-100 border-violet-900 shadow-md overflow-hidden">
              <div className='p-1 md:m-4'>
                  <CardHeader className="py-0">
                      <CardTitle className="mb-8 text-center dark:text-white flex flex-col gap-2 items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-violet-700 rounded-full">
          <Link to="/"><RiCurrencyFill className="text-3xl text-white hover:animate-spin" /></Link>
        </div>
                          Sign In
                      </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                          <div className='mb-4 space-y-6'>
                              <SocialAuth isLoading={loading} setLoading={setLoading} />
                              <Seperator />
                              
                              <Input
                                  disabled={loading}
                                  id="email"
                                  label="Email"
                                  name="email"
                                  register={register}
                                  type="email"
                                  placeholder="you@example.com"
                                  error={errors?.firstName?.message}
                                  
                                  {...register("email")}
                                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray dark:text-white  dark:outline-none"
                              />
                              <Input
                                  disabled={loading}
                                  id="password"
                                  label="Password"
                                  name="password"
                                  register={register}
                                  type="password"
                                  placeholder="Your Password"
                                  error={errors?.firstName?.message}
                                  
                                  {...register("password")}
                                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray dark:text-white dark:outline-none"
                              />
                          </div>

                          <Button
                              type="submit"
                              className="w-full bg-violet-800"
                              disabled={loading}
                          >
                              {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  "Sign in"
                )}
                          </Button>
                      </form>
                  </CardContent>
              </div>

              <CardFooter className="justify-center gap-2">
                  <p className='text-sm text-gray-600 dark:text-white'>Don't have an account?</p>
                  <Link to="/sign-up"
                      className='text-sm font-semibold text-violet-600 hover:underline'
                  >
                      Sign Up
                  </Link>
              </CardFooter>
          </Card>
      </div>
  )
}

export default SignIn