import { useSelector, useDispatch } from 'react-redux'
import { http } from 'app/services/http';
import loggedInUserStore from 'app/stores/loggedInUser';

export default function useLoginUser() {
  const loginUser = useSelector(state => {
    return state[loggedInUserStore.name].userInfo;
  })

  const dispatch = useDispatch()

  const fetchLoginUser = () => {
    // モックデータを取得
    http.send({
      url: '/.api/loginUser.json',
    }).subscribe(res => {
      // TODO: this is sample code
      dispatch(loggedInUserStore.actions.setUserInfo(res.data as any));
    })
  }

  return {
    loginUser,
    fetchLoginUser,
  }
}