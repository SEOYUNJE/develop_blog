/* Docker & Engineering Blog Theme 
  - Main Color: Blue-600 (Docker Blue) & Slate-900 (Terminal)
  - Font: Sans for body, Mono for data/meta-data
  - Concept: Container, Structured, Clean
*/

// =============================================================================
// Navigation & Layout
// =============================================================================

// menu style - 상단 메뉴 (콘솔 버튼 느낌)
const menuListStyle = `md:ml-8 px-4 py-2 text-[15px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer capitalize flex items-center gap-2`;

// mobile menu style
const mobileMenuStyle = `m-0 block py-4 px-6 border-b border-slate-100`;

// =============================================================================
// Blog Content Typography (기술 문서 스타일)
// =============================================================================

// 제목 스타일 - 명확한 계층 구조와 밑줄/포인트 컬러 강조
const posth1Style = `text-4xl md:text-5xl font-extrabold tracking-tight mb-8 mt-12 text-slate-900 decoration-blue-500/30 decoration-4 underline-offset-4`;
const posth2Style = `text-3xl md:text-4xl font-bold tracking-tight mb-6 mt-16 pl-4 border-l-8 border-blue-600 text-slate-800`;
const posth3Style = `text-2xl md:text-3xl font-bold mb-4 mt-10 text-slate-800 flex items-center before:content-['#'] before:text-blue-400 before:mr-2`;
const posth4Style = `text-2xl font-bold mb-3 mt-6 text-slate-700`;
const posth5Style = `text-xl font-bold mb-2 mt-4 text-slate-700`;
const posth6Style = `text-lg font-bold mb-2 mt-4 text-slate-700`;

// 본문 텍스트 - 가독성 최적화
const postpStyle = `text-[17px] leading-[1.8] my-6 text-slate-700 break-keep tracking-normal font-sans`;

// 이미지 - 테두리와 그림자로 구획 강조
const postimgStyle = `border border-slate-200 rounded-xl shadow-sm my-10 mx-auto block max-w-full h-auto align-middle`;

// 링크
const postaStyle = `text-[17px] text-blue-600 font-medium decoration-2 hover:underline underline-offset-2 transition duration-200`;

// 리스트
const postulStyle = `list-disc list-outside ml-6 text-[17px] text-slate-700 marker:text-blue-500`;
const postolStyle = `list-decimal list-outside ml-6 text-[17px] text-slate-700 marker:text-blue-500 marker:font-bold`;
const postliStyle = `pl-2 mb-2 leading-relaxed tracking-wide`;

// 인용구 - Info Box 스타일
const postblockquoteStyle = `border-l-[6px] border-blue-500 bg-blue-50/50 p-6 my-8 rounded-r-lg text-slate-700 italic relative`;

// 구분선
const posthrStyle = `my-12 border-slate-200 border-t-2 rounded-full`;

// 강조
const postemStyle = `text-[17px] font-medium italic text-slate-800 bg-yellow-100/50 px-1 rounded`;
const poststrongStyle = `text-[17px] font-extrabold text-slate-900`;

// =============================================================================
// Code & Terminal ( 핵심: Dark Mode )
// =============================================================================

// 인라인 코드
const postcodeStyle = `font-mono text-[15px] text-blue-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200`;

// 블로그 내 일반 코드 블록 (pre)
const postpreStyle = `relative bg-slate-900 text-slate-200 p-6 rounded-xl mb-8 overflow-x-auto shadow-lg border border-slate-800 font-mono text-[14px] leading-relaxed`;

// Notebook 코드 셀 (터미널 창 느낌)
const notebookpreStyle = `relative bg-slate-950 text-slate-200 p-6 rounded-xl mb-8 overflow-x-auto shadow-2xl border border-slate-800 font-mono text-[14px] leading-relaxed group`;
const notebookcodeStyle = `font-mono bg-transparent text-sky-300`; // 형광 하늘색

// 복사 버튼 (호버 시에만 명확하게 보임)
const notebookcopyButtonStyle = `border border-slate-700 bg-slate-800/50 hover:bg-blue-600 hover:text-white hover:border-blue-500 text-slate-400 rounded-md absolute top-4 right-4 p-1.5 transition-all shadow-sm opacity-0 group-hover:opacity-100`;
const notebookdownloadButtonStyle = `download-button px-5 py-2.5 mb-4 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all`;

// =============================================================================
// Tables (System Data Grid Style)
// =============================================================================

const posttableStyle = `w-full text-sm text-left text-slate-600 border-collapse rounded-lg overflow-hidden shadow-sm border border-slate-200 my-8`;
const posttheadStyle = `text-xs font-mono font-bold text-slate-500 uppercase bg-slate-100 tracking-wider`;
const postthStyle = `px-6 py-4 border-b border-slate-200 text-left`;
const posttbodyStyle = `text-left bg-white`;
const posttdStyle = `px-6 py-4 border-b border-slate-100 text-sm font-mono text-slate-600 hover:bg-blue-50/30 transition-colors`;

// =============================================================================
// Metadata (Header & Author)
// =============================================================================

// 카테고리 뱃지 (Docker Image Tag 느낌)
const postcategoryStyle = `inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-bold bg-blue-100 text-blue-700 tracking-wide mb-4 border border-blue-200 hover:bg-blue-200 transition`;

// 제목 영역
const posttitleStyle = `md:text-5xl text-3xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight`;

// 작성자 및 날짜 영역
const postauthordateDivStyle = `flex items-center mt-6 mb-10 pb-6 border-b border-slate-100`;
const postauthorDivStyle = `flex items-center`;
const postauthorImgStyle = `w-10 h-10 rounded-full object-cover border-2 border-slate-100 mr-3`;
const postauthorStyle = `text-sm font-bold text-slate-800 mr-2`;
const postdateStyle = `text-slate-400 text-xs font-mono uppercase tracking-wide before:content-['|'] before:mr-2 before:text-slate-300`;

const postimgtitleStyle = `w-full max-h-[500px] object-cover object-center rounded-2xl shadow-md mx-auto block mb-12`;
const postsectionStyle = `w-full mb-16 max-w-full`;

// =============================================================================
// Blog List Cards (Container Style)
// =============================================================================

// 첫 번째 큰 카드
const bloglistFirstCardStyle = `lg:col-span-3 md:col-span-2 col-span-1 bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex md:flex-row flex-col cursor-pointer group`;
const bloglistFirstCardImgStyle = `w-full md:w-1/2 h-[300px] md:h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500`;
const bloglistFirstCardDescriptionStyle = `text-slate-500 text-[16px] leading-relaxed line-clamp-3 mb-4`;

// 일반 카드 (Shipping Container)
const bloglistCardStyle = `group flex flex-col h-full bg-white rounded-xl border-[1.5px] border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden`;
const bloglistCardImgStyle = `w-full h-[220px] object-cover object-center border-b border-slate-100 group-hover:scale-105 transition-transform duration-500`;

const bloglistCardBodyStyle = `p-6 flex flex-col flex-1`;
const bloglistCardTitleStyle = `font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors`;
const bloglistCardCategoryStyle = `inline-block bg-slate-100 text-slate-600 text-xs font-mono font-bold px-2 py-1 rounded border border-slate-200 mb-3`;
const bloglistCardDescriptionStyle = `text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4`;

// 카드 내 작성자 정보
const bloglistCardAuthorDivStyle = `mt-auto flex items-center pt-4 border-t border-slate-100`;
const bloglistCardAuthorImgStyle = `w-6 h-6 rounded-full object-cover mr-2 bg-slate-200`;
const bloglistCardAuthorStyle = `text-xs font-bold text-slate-700 mr-2`;
const bloglistCardDateStyle = `text-slate-400 text-xs font-mono`;

// =============================================================================
// Search & Category & Pagination
// =============================================================================

// 검색창
const searchInputStyle = `absolute top-20 right-8 w-[240px] h-10 rounded-lg border border-slate-300 pl-3 text-sm font-bold text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm`;

// 카테고리 목록
const categoryContainerStyle = `hidden flex-col md:w-[220px] overflow-y-auto rounded-lg bg-white shadow-lg border border-slate-200 z-10`;
const categoryItemStyle = `text-sm font-medium px-5 py-3 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-50 last:border-0 flex justify-between`;
const categoryItemCountStyle = `text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full`;

// 페이지네이션
const paginationStyle = `mt-24 mb-32 flex justify-center items-center gap-4`;
const pageMoveButtonStyle = `flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all`;
const pageNumberListStyle = `flex items-center justify-center gap-2`;
const pageNumberStyle = `relative inline-flex items-center justify-center w-10 h-10 text-sm font-mono font-bold text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all`;
const pageNumberActiveStyle = `text-white bg-blue-600 shadow-md shadow-blue-200 pointer-events-none`;