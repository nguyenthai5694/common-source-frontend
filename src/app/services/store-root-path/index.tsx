import { pathFromGyosebunsyokose, pathFromGyosebunsyoList } from 'app/const/adm.const';

export const storePathNavigation = 'store_navigation_path';
export const routerNav = {
  '/rec/shuju-list': ['/rec/denshitoroku', '/rec/shujutoroku', '/rec/shuju-detail'],
  '/rec/gomi': ['/rec/shuju-detail'],
  '/rec/shujukanryo-list': ['/rec/shuju-detail', '/rec/shujutoroku'],
  '/mim/hozonkikanhyo': [
    '/mim/hozonkikanhyo/register',
    '/mim/hozonkikanhyo/detail',
    '/mim/hozonkikanhyo/edit',
  ],
  '/mim/offlineoutputlist': [
    '/mim/shokangaeichiran',
    '/mim/shokangaeichiranrs',
  ],
  '/mim/haikiikanbosearch': [
    '/mim/shokangaeichiran',
    '/mim/shokangaeichiranrs',
  ],
  '/mim/offlineikkatsuoutput': [
    '/mim/offlinejokensetteidlg',
    '/mim/offlinejokencreate',
  ],
  '/mim/templatemail': ['/mim/users'],
  '/mim/offlinejokensetteidlg': [
    '/mim/offlinejokencreate',
    '/mim/offlinejokensetteidlg',
  ],
  '/mim/shokangaeiraiichiran': [
    '/mim/shokangaeshinsa',
    '/mim/shokangaeirai',
    '/mim/shokangaeranchu',
    '/mim/shokangaerandaibunruishosai',
    '/mim/shokangaeichiran',
    '/mim/shokangaerankobunruij',
    '/mim/shokangaeichiranshimegi',
    '/mim/shokangaeichiranrs',
  ],
  '/mim/fushokanshokangaeshinsa': [
    '/mim/shokangaeshinsa',
    '/mim/shokangaeranchu',
    '/mim/shokangaeirai',
    '/mim/shokangaerandaibunruishosai',
    '/mim/shokangaeichiran',
    '/mim/shokangaeichiranrs',
    '/mim/shokangaerankobunruij',
    '/mim/shokangaeichiranshimegi',
  ],
  '/mim/shokangaekakunin': [
    '/mim/shokangaeshinsa',
    '/mim/shokangaeirai',
    '/mim/shokangaeranchu',
    '/mim/shokangaerandaibunruishosai',
    '/mim/shokangaeichiran',
    '/mim/shokangaeichiranrs',
    '/mim/shokangaerankobunruij',
    '/mim/shokangaeichiranshimegi',
    '/mim/shokangae',
    '/mim/detahoseisettei',
    '/mim/shokangae/details',
  ],
  '/mim/shuukei': [
    '/mim/shuukei/detail',
  ],
  '/usp/oshirase/admin': ['/usp/oshirase/admin', '/usp/oshirase/admin/regist', '/usp/oshirase/admin/edit',
    '/usp/header/oshirase/admin', '/usp/header/oshirase/admin/edit'],
  '/usp/oshirase/system': ['/usp/oshirase/system', '/usp/oshirase/system/regist', '/usp/oshirase/system/edit',
    '/usp/header/oshirase/system', '/usp/header/oshirase/system/edit'],
  '/adm/gyosebunsyo-create': ['/adm/gyosebunsyo-create'],
  '/adm/daibunruilist': ['/adm/gyosebunsyo-create'],
  '/adm/shinsabunruilist':
    ['/adm/shinsabunruilistdaibunruidetail', '/adm/shinsabunruilistchubunruidetail',
      '/adm/kobunrui-detail', '/adm/shinsabunruilisthyojyungyoseidetail', '/adm/gyosebunsyofiledetail',
    ],
  '/adm/shinsabunruishinsashinchokulist':
    ['/adm/shinsabunruilistdaibunruidetail', '/adm/shinsabunruilistchubunruidetail',
      '/adm/kobunrui-detail', '/adm/shinsabunruilisthyojyungyoseidetail', '/adm/gyosebunsyofiledetail',
      '/adm/daibunrui-create', '/adm/daibunrui-update', '/adm/daibunrui-delete',
      '/adm/chubunrui-create', '/adm/chubunrui-update', '/adm/chubunrui-delete',
      '/adm/hyojunbunsyofile-create', '/adm/hyojunbunsyofile-update', '/adm/hyojunbunsyofile-delete',
      '/adm/gyosebunsyofile-create', '/adm/gyosebunsyofile-update', '/adm/gyosebunsyofile-delete',
    ],
  '/adm/shinsabunruikanryolist':
    ['/adm/shinsabunruilistdaibunruidetail', '/adm/shinsabunruilistchubunruidetail',
      '/adm/kobunrui-detail', '/adm/shinsabunruilisthyojyungyoseidetail', '/adm/gyosebunsyofiledetail',
    ],
  '/adm/rshinagatalist': ['/adm/rscheckitemhinagataregist'],
  '/adm/ikanjyuryotopmenu': [
    '/adm/jyuryoirailist',
    '/adm/jyuryoiraigotorisagelist',
    '/adm/jyuryoiraigoupdatehistorylist',
    '/adm/jyuryoiraifilelist',
    '/adm/jyuryoiraigoupdatehistorydetail',
    '/adm/jyuryoiraihistorylist',
    '/adm/jyuryoiraigotorisagedetail',
    '/adm/receiptrequesthistorydetails',
    '/adm/jyuryoiraihistorydetails',
  ],
  '/adm/gyosebunsyofilesearch': [
    ...pathFromGyosebunsyoList,
    '/adm/gyosebunsyobatchupdate',
  ],
  '/adm/hikitsugukanryolist': [
    ...pathFromGyosebunsyoList,
    '/adm/hikitsuguzumifilelist',
  ],
  '/adm/batchhikitsugusettinglist': ['/adm/batchhikitsuguaddsearch', '/adm/gyosebunsyofilehikitsugi'],
  '/adm/shinsaikankyogishinchokubusholist': ['/adm/shinsaikankyogishinchokulist'],
  '/adm/shinsaikankyogishinchokulist': ['/adm/shinsaikankyogishinchokubusholist'],
  '/adm/haikiikanhozonkikan-list':
    ['/adm/gyoseifilehaiki', '/adm/batchhaikiikanhozonkikansearch', '/adm/gyoseifileikan'],
  '/adm/batchhaikisettinglist': ['/adm/batchhaikiikanhozonkikansearch', '/adm/gyoseifilehozonkikanencho'],
  '/adm/haikiikanshinchokukanri-list': ['/adm/haikiikanfairushinchokukanri-list'],
  '/adm/haikikyogitopmenu': ['/adm/haikishinsa-list', '/adm/haikishinsairaigotorisagelist',
    '/adm/haikishinshairaigotorisagedetail', '/adm/haikishinsairaigoyodatehistorylist',
    '/adm/haikishisaupdatehistorydetail', '/adm/haikishisahistorylist', '/adm/haikishinsahistorydetails',
    '/adm/haikifilelist', '/adm/iraibunsholist'],
  '/adm/gyosebunsyosearch':
    ['/adm/gyosebunsyoshoshibatchupdate', ...pathFromGyosebunsyokose, '/adm/gyosebunsyokose'],
  '/adm/tenpubunkeywordsearch':
    ['/adm/gyosebunsyokose', '/adm/gyosebunsyoinfoupdate',
      '/adm/shiryokosechange', '/adm/gyosebunsyo-create',
      '/adm/gyosebunsyo-ido', '/adm/gyosebunsyotantochange',
      '/adm/gyosebunsyosanshokenfuyo', '/adm/gyosebunsyolist'],
  '/adm/hikitsugushinsairailistsoukatsu':
    ['/adm/hikitsugushinsalistsokatsu'],
  '/adm/shinsahaikikyougishinchokubusholist': ['/adm/shinsahaikikyogishinchokulist'],
  '/adm/shinsahaikikyogishinchokulist': ['/adm/shinsahaikikyougishinchokubusholist'],
  '/adm/uketsukebunshohozon': ['/adm/gyosebunsyo-create'],
  '/adm/batchrssettinglist': ['/adm/rskakunininquyridetail', '/adm/rskakunisetting'],
  '/adm/rssettingshinchokukanri': ['/adm/rssettingfileshinchoku'],
  '/adm/rskakuninshinchokulist':
    ['/adm/rssettingkakuninzumifilelist',
      '/adm/rskakunininquyridetail',
      '/adm/rskakunininquyridetail-ka',
      '/adm/rskakunisetting',
      '/adm/rskakunisetting-ka'],
  '/adm/kakuninkanryoichiran': ['/adm/rskakunininquyridetail'],
  '/adm/rskakunintopmenu':
    ['/adm/rskakunin-file-list', '/adm/rskakunin-history-list', '/adm/rskakuninhistorydetail',
      '/adm/rskakuniniraigotorisagelist', '/adm/rskakuniniraiatoutorisagedetail',
      '/adm/rskakuniniraigoupdatehistorylist', '/adm/rskakuniniraigoupdatehistorydetail',
      '/adm/rskakuninfilelist', '/adm/rskakunininquyridetail', '/adm/rskakunisetting',
      '/adm/shoukaikakuninsetting',
    ],
  '/adm/kanaibunsyolist': [...pathFromGyosebunsyokose, '/adm/gyosebunsyokose', '/dae/kian', '/dae/shiko'],
  '/dae/bunsyolist':
    ['/dae/kian', '/dae/shuju-bunsyo-refer', '/dae/hinagatarootlist', '/dae/hinagata-route-info',
      '/dae/shiko', '/dae/shiko-detail-edit-tenaishiko', '/dae/kamishikoregist',
      '/dae/koinshinsa', '/dae/shiko-detail-edit-other-system',
      '/dae/kanposhinsa', '/dae/shikodetailedit-denshimail',
    ],
  '/dae/shujulist':
    ['/rec/shuju-detail', '/dae/kian', '/dae/hinagatarootlist', '/dae/hinagata-route-info'],
  '/dae/kianexample':
    ['/dae/kian', '/dae/hinagatarootlist', '/dae/hinagata-route-info'],
  '/dae/hinagatarootlist': ['/dae/hinagata-root-regist', '/dae/hinagata-route-info'],
  '/dae/koinshalist': ['/dae/koinshasetting'],
  '/dae/shikomailconfirm': ['/dae/shikomaildetail'],
  '/dae/tantoshachangelist': ['/dae/tantosha-change'],
}
interface StoreData {
  rootPath: string,
}
export function getPathNavigation(): StoreData | null {
  if (typeof (Storage) === undefined) return;

  let data;

  try {
    data = JSON.parse(sessionStorage.getItem(storePathNavigation));
  } catch (error) { }

  return data || null;
}

export function setPathNavigation(data): void {
  if (typeof (Storage) === 'undefined') return;

  sessionStorage.setItem(storePathNavigation, JSON.stringify(data));
}

export function getQueryStringRootPath(hasQueries = false): string {
  const pathStored = getPathNavigation();

  if (!pathStored && !(pathStored?.rootPath in routerNav)) return ''

  let pathStr: string = ''

  if (pathStored.rootPath === '/') {
    pathStr = '/'
  } else {
    pathStr = pathStored?.rootPath.split('/').filter(Boolean).slice(1).join('/');
  }

  const param = {
    fromTo: pathStr,
  }
  const queryString = new URLSearchParams({ ...param }).toString();

  return queryString ?
    hasQueries ?
      '&' + queryString :
      '?' + queryString :
    '';
}
