import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";
import { LoginEffects } from "./login/login.effects";
import { loginReducer } from "./login/login.reducer";
import { registerReducer } from "./register/register.reducer";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer),
    StoreModule.forFeature("register", registerReducer),
    
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        LoginEffects,
    ])
]