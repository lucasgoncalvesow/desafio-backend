import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import User from 'App/Repositories/User'
const userRepository = new User()
// import User from 'App/Models/User'

export default class UsersController {
  public async index({ }: HttpContextContract) {
    return await userRepository.index()
  }

  public async store({ request, response }: HttpContextContract) {

    let userStore = await userRepository.store(request.body())

    if (userStore == "menor") {
      return response.status(401).send("Apenas maiores de 18 anos podem criar uma conta.")
    }

    return response.status(201).send({ user: userStore })
  }

  public async show({ params, response }: HttpContextContract) {
    let showUser = await userRepository.show(params)

    if (!showUser) {
      return response.status(404).send({ message: "Não foi possível listar usuários" })
    }

    return showUser
  }

  public async update({ params, request, response }: HttpContextContract) {
    let userUpdate = await userRepository.update(params, request.body())

    if (!userUpdate) {
      return response.status(404).send({ message: "Não foi possível atualizar." })
    }

    return response.status(200).send({ user: userUpdate })
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    let userDestroy = await userRepository.destroy(params, auth)

    if (!userDestroy) {
      return response.status(404).send({ message: "Não foi possível excluir." })
    }

    return response.status(200).send({ message: `Usuário ID ${userDestroy} excluído com sucesso!` })
  }

}
