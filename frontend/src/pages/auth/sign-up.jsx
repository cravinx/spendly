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
import api from '../../libs/apiCall'
import { toast } from 'sonner'
import { ThemeSwitch } from '../../components'
import { RiCurrencyFill } from "react-icons/ri";
import {BackgroundImage} from '../../assets';

const RegisterSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    firstName: z.string({ required_error: "Name is required" })
        .min(3, "Name is required"),
    lastName: z.string({ required_error: "Name is required" })
        .min(3, "Name is required"),
    password: z
        .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})

const SignUp = () => {
    const { user } = useStore(state => state)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterSchema)
    });

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && navigate("/overview")
    }, [user]);
    const onSubmit = async (data) => {
        try {
            setLoading(true)

            const { data: res } = await api.post("/auth/sign-up", data)
            
            if (res?.user) {
                toast.success("Account created successfully. You can now login.")
                setTimeout(() => {
                    navigate("/sign-in");
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
      style={{ backgroundImage: `url(${BackgroundImage})` }}>
          <div className="fixed right-5 md:right-10 top-[25%]">
        <ThemeSwitch/>
      </div>
          <Card className="w-[400px] bg-violet-100 dark:bg-violet-900 dark:border-violet-100 border-violet-900 shadow-md overflow-hidden">
              <div className='p-3 md:p-1 md:m-4'>
                  <CardHeader className="py-0">
                      <CardTitle className="mb-8 text-center dark:text-white flex flex-col gap-2 items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-violet-700 rounded-full">
          <Link to="/"><RiCurrencyFill className="text-3xl text-white hover:animate-spin" /></Link>
        </div>
                          Create Account
                      </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                          <div className='mb-4 space-y-6'>
                              <SocialAuth isLoading={loading} setLoading={setLoading} />
                              <Seperator />
                              
                              <Input
                                  disabled={loading}
                                  id="firstName"
                                  label="First Name"
                                  name="firstName"
                                  register={register}
                                  type="text"
                                  placeholder="John"
                                  error={errors?.firstName?.message}
                                  
                                  {...register("firstName")}
                                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray dark:text-white  dark:outline-none"
                              />
                              <Input
                                  disabled={loading}
                                  id="lastname"
                                  label="Last Name"
                                  name="lastname"
                                  register={register}
                                  type="text"
                                  placeholder="Smith"
                                  error={errors?.lastName?.message}
                                  
                                  {...register("lastName")}
                                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray dark:text-white  dark:outline-none"
                              />
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
                                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray dark:text-white  dark:outline-none"
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
                  "Create Account"
                )}
                          </Button>
                      </form>
                  </CardContent>
              </div>

              <CardFooter className="justify-center gap-2">
                  <p className='text-sm text-gray-600 dark:text-white'>Already have an account?</p>
                  <Link to="/sign-in"
                      className='text-sm font-semibold text-violet-600 hover:underline'
                  >
                      Sign In
                  </Link>
              </CardFooter>
          </Card>
      </div>
  )
}

export default SignUp