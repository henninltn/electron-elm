module Main exposing (..)

import Tachyons exposing (classes, tachyons)
import Tachyons.Classes exposing (f1, purple)
import FontAwesome.Web as Icon
import Html exposing (Html, div, text, program)

-- モデル


type alias Model =
    String


init : ( Model, Cmd Msg )
init =
    ( "Hello, Electron Elm!", Cmd.none )



-- メッセージ


type Msg
    = NoOp



-- ビュー


view : Model -> Html Msg
view model =
  div [ classes [ f1, purple ] ]
      [ tachyons.css
      , Icon.check_circle
      , text model ]
{-
view model =
    div [ classes [ f1, purple ] ]
        [ tachyons.css
        , text model
        ]
-}




-- 更新


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- サブスクリプション(購読)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
