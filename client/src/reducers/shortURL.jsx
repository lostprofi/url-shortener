import {
  URL_SHORTENED, RESET_INIT_URL_DATA_OBJ, SIGN_OUT, DESC_ADDED, TAG_ADDED,
} from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case URL_SHORTENED:
      sessionStorage.setItem('links', JSON.stringify([...state, action.payload]));
      return [action.payload, ...state];

    case RESET_INIT_URL_DATA_OBJ: {
      if (!JSON.parse(sessionStorage.getItem('userToken'))) {
        return [...state];
      }
      return [...action.payload, ...state];
    }


    case SIGN_OUT:
      return [];

    case DESC_ADDED: {
      const matchObjSt = state.find((el) => el.shortenURL === action.payload.shortenURL);
      matchObjSt.description = action.payload.description;

      const linksObjArrStore = JSON.parse(sessionStorage.getItem('links'));
      const matchObjStore = linksObjArrStore.find(
        (el) => el.shortenURL === action.payload.shortenURL,
      );
      matchObjStore.description = action.payload.description;
      sessionStorage.setItem('links', JSON.stringify(linksObjArrStore));

      return [...state];
    }

    case TAG_ADDED: {
      const matchObjSt = state.find((el) => el.shortenURL === action.payload.shortenURL);

      const tagsArr = matchObjSt.tags;

      matchObjSt.tags = [...tagsArr, action.payload.tag];

      const linksObjArrStore = JSON.parse(sessionStorage.getItem('links'));
      const matchObjStore = linksObjArrStore.find(
        (el) => el.shortenURL === action.payload.shortenURL,
      );

      const storeTagsArr = matchObjStore.tags;

      matchObjStore.tags = [...storeTagsArr, action.payload.tag];

      sessionStorage.setItem('links', JSON.stringify(linksObjArrStore));

      return [...state];
    }


    default:
      return state;
  }
};
