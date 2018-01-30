import Quotes from "./../Quotes";
import {singleton} from "@sphinx-software/fusion/MetaInjector";
import {post, get, controller} from "@sphinx-software/fusion/Http";
import LoginForm from "./LoginForm";

@singleton(Quotes)
@controller()
export default class WelcomeController {

    /**
     *
     * @param {Quotes} quotes
     */
    constructor(quotes) {
        this.quotes = quotes;
    }

    @get('/')
    async index(context) {
        context.body = context.view.make('index')
            .bind('quote', this.quotes.get())
            .bind('form', context.session.get('login.invalid'))
        ;
    }

    @post('/welcome', [LoginForm])
    async user(context) {
        context.body = context.view.make('welcome')
            .bind('user', context.form.user())
        ;
    }
}
