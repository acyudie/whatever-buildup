import React, { useState, useEffect } from 'react';
import './HanaHome.css';

const HanaHome = () => {
    const [activeNav, setActiveNav] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
    const [formData, setFormData] = useState({ name: '', phone: '', category: '', message: '' });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setActiveNav(id);
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const encode = (data) => Object.keys(data)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');

    const handleConsultSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({ 'form-name': 'consultation', ...formData }),
            });
            setFormStatus('success');
            setFormData({ name: '', phone: '', category: '', message: '' });
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <div className="hana-container">

            {/* ===== STICKY HEADER ===== */}
            <header className={`hana-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-inner">
                    <div className="logo" onClick={() => scrollTo('home')}>
                        <img src="/logo.png" alt="하나재가노인복지센터 로고" className="logo-img" />
                        <div className="logo-text">
                            <span className="logo-main">하나재가노인복지센터</span>
                            <span className="logo-sub">Hana Senior Care Center</span>
                        </div>
                    </div>
                    <nav className="hana-nav">
                        {[
                            { id: 'home', label: '홈' },
                            { id: 'about', label: '센터소개' },
                            { id: 'services', label: '서비스안내' },
                            { id: 'staff', label: '직원현황' },
                            { id: 'fees', label: '이용요금' },
                            { id: 'process', label: '이용절차' },
                            { id: 'rights', label: '이용자권리' },
                            { id: 'notice', label: '공지사항' },
                            { id: 'contact', label: '오시는길' },
                        ].map(({ id, label }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={activeNav === id ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <button className="consult-btn" onClick={() => scrollTo('contact')}>
                        📞 상담문의
                    </button>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
                {menuOpen && (
                    <div className="mobile-menu">
                        {[
                            { id: 'home', label: '홈' },
                            { id: 'about', label: '센터소개' },
                            { id: 'services', label: '서비스안내' },
                            { id: 'staff', label: '직원현황' },
                            { id: 'fees', label: '이용요금' },
                            { id: 'process', label: '이용절차' },
                            { id: 'rights', label: '이용자권리' },
                            { id: 'notice', label: '공지사항' },
                            { id: 'contact', label: '오시는길' },
                        ].map(({ id, label }) => (
                            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
                        ))}
                    </div>
                )}
            </header>

            {/* ===== HERO SECTION ===== */}
            <section id="home" className="hana-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge">노인장기요양기관 지정 · 운영</div>
                    <h1>어르신의 든든한 가족이<br />되어드립니다</h1>
                    <p>하나재가노인복지센터는 어르신의 존엄과 삶의 질 향상을 위해<br />전문적이고 따뜻한 재가서비스를 제공합니다.</p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => scrollTo('contact')}>무료 등급신청 상담</button>
                        <button className="btn-secondary" onClick={() => scrollTo('services')}>서비스 자세히 보기</button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-num">2020</span>
                            <span className="stat-label">설립연도</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">전문</span>
                            <span className="stat-label">요양보호사</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">24시</span>
                            <span className="stat-label">상담 가능</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== QUICK INFO BAR ===== */}
            <div className="quick-info-bar">
                <div className="container">
                    <div className="quick-info-grid">
                        <div className="quick-item">
                            <span className="q-icon">📋</span>
                            <div>
                                <strong>기관 유형</strong>
                                <span>재가노인복지시설 (방문요양)</span>
                            </div>
                        </div>
                        <div className="quick-item">
                            <span className="q-icon">🏛️</span>
                            <div>
                                <strong>설치신고</strong>
                                <span>노인복지법 제38조 근거</span>
                            </div>
                        </div>
                        <div className="quick-item">
                            <span className="q-icon">💰</span>
                            <div>
                                <strong>국비지원</strong>
                                <span>85% ~ 100% 지원</span>
                            </div>
                        </div>
                        <div className="quick-item">
                            <span className="q-icon">📞</span>
                            <div>
                                <strong>상담문의</strong>
                                <span>02-822-6220 (09:00~18:00)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== 1. 기관소개 ===== */}
            <section id="about" className="hana-section about-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">01 / 센터소개</span>
                        <h2>하나재가노인복지센터를 소개합니다</h2>
                        <p className="section-desc">어르신이 살아온 삶의 공간에서 건강하고 행복하게 노후를 보내실 수 있도록 최선을 다합니다.</p>
                    </div>

                    {/* 기관 기본정보 */}
                    <div className="facility-info-card">
                        <h3 className="card-title">📌 기관 기본정보</h3>
                        <div className="info-table-grid">
                            <div className="info-row"><span className="info-label">기관명</span><span className="info-value">하나재가노인복지센터</span></div>
                            <div className="info-row"><span className="info-label">기관 유형</span><span className="info-value">재가노인복지시설 (방문요양기관)</span></div>
                            <div className="info-row"><span className="info-label">대표자</span><span className="info-value">고시환 (사회복지사 1급)</span></div>
                            <div className="info-row"><span className="info-label">설치 근거</span><span className="info-value">노인복지법 제38조</span></div>
                            <div className="info-row"><span className="info-label">지정일</span><span className="info-value">2020.7.13 (방문요양, 방문목욕)</span></div>
                            <div className="info-row"><span className="info-label">기관번호</span><span className="info-value">2-11590-00250</span></div>
                            <div className="info-row"><span className="info-label">소재지</span><span className="info-value">서울시 동작구 성대로29길 59(1층)</span></div>
                            <div className="info-row"><span className="info-label">전화번호</span><span className="info-value">02-822-6220</span></div>
                            <div className="info-row"><span className="info-label">팩스번호</span><span className="info-value">02-822-6225</span></div>
                            <div className="info-row"><span className="info-label">이메일</span><span className="info-value">shgo2004@hanmail.net</span></div>
                            <div className="info-row"><span className="info-label">운영 시간</span><span className="info-value">월 ~ 토 09:00 ~ 18:00 (공휴일 제외)</span></div>
                        </div>
                    </div>

                    {/* 인사말 & 비전 */}
                    <div className="about-content">
                        <div className="about-text">
                            <h3><img src="/logo.png" alt="로고" style={{ height: '30px', verticalAlign: 'middle', marginRight: '8px' }} />설립 목적 및 인사말</h3>
                            <p>
                                안녕하세요, <strong>하나재가노인복지센터</strong> 대표 고시환입니다.
                            </p>
                            <p>
                                저희 센터는 <strong>노인복지법 제38조</strong>에 따라 설치·운영되는 재가노인복지시설로,
                                어르신들이 오랫동안 살아온 소중한 가정에서 편안하고 품위 있는 노후를 보내실 수 있도록
                                전문적인 재가서비스를 제공하고 있습니다.
                            </p>
                            <p>
                                단순한 돌봄을 넘어, 어르신의 자립 능력을 최대한 존중하고
                                가족분들에게는 믿고 맡길 수 있는 든든한 파트너가 되겠습니다.
                            </p>
                            <div className="mission-values">
                                <div className="value-item">
                                    <span className="v-icon">🎯</span>
                                    <div><strong>미션</strong><p>어르신의 건강하고 행복한 일상 지원</p></div>
                                </div>
                                <div className="value-item">
                                    <span className="v-icon">👁️</span>
                                    <div><strong>비전</strong><p>지역사회 최고의 신뢰받는 재가기관</p></div>
                                </div>
                                <div className="value-item">
                                    <span className="v-icon">💎</span>
                                    <div><strong>핵심가치</strong><p>존엄 · 전문성 · 투명성 · 소통</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="about-visual">
                            <div className="about-image-box">
                                <img
                                    src="/hana-family.png"
                                    alt="하나재가노인복지센터 - 따뜻한 가족 같은 돌봄"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        flex: 1,
                                        display: 'block',
                                        padding: '16px',
                                        background: '#fefaf8'
                                    }}
                                />
                            </div>
                            <div className="history-card">
                                <h4>📅 연혁</h4>
                                <ul className="history-list">
                                    <li><span className="year">2020.6</span> 하나재가노인복지센터 설립신고 (동작구청장)</li>
                                    <li><span className="year">2020.7</span> 장기요양기관 지정 (방문요양, 방문목욕)</li>
                                    <li><span className="year">2021</span> 감염병 예방 관리체계 강화</li>
                                    <li><span className="year">2023</span> 품질관리 우수기관 선정</li>
                                    <li><span className="year">2026</span> 현재 운영 중</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 2. 서비스 안내 ===== */}
            <section id="services" className="hana-section services-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">02 / 서비스안내</span>
                        <h2>어르신을 위한 전문 재가서비스</h2>
                        <p className="section-desc">노인장기요양보험에 따른 급여 서비스와 다양한 지원을 제공합니다.</p>
                    </div>

                    {/* 이용 대상 */}
                    <div className="eligibility-banner">
                        <h3>✅ 이용 대상</h3>
                        <div className="eligibility-grid">
                            <div className="elig-item">
                                <span className="elig-num">①</span>
                                <p><strong>65세 이상</strong> 어르신 중 <br />일상생활이 어려우신 분 <br />(장기요양 1~5등급, 인지지원등급)</p>
                            </div>
                            <div className="elig-item">
                                <span className="elig-num">②</span>
                                <p><strong>65세 미만</strong>이지만 <br />치매, 뇌혈관성 질환 등 <br />노인성 질병이 있으신 분</p>
                            </div>
                            <div className="elig-item">
                                <span className="elig-num">③</span>
                                <p><strong>국민건강보험공단</strong>으로부터 <br />장기요양 등급 판정을 <br />받으신 분</p>
                            </div>
                        </div>
                        <p className="elig-note">※ 등급 판정을 받으시면 <strong>총 비용의 85~100%</strong>를 국가에서 부담합니다 (등급별 상이)</p>
                    </div>

                    {/* 서비스 카드 */}
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">🏠</div>
                            <h3>방문요양</h3>
                            <p className="service-desc">요양보호사가 가정에 방문하여 어르신의 신체활동 및 가사활동을 지원합니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>신체활동 지원</strong>
                                    <ul>
                                        <li>세면, 구강관리, 몸단장</li>
                                        <li>옷 갈아입히기, 식사 도움</li>
                                        <li>체위변경, 이동 도움</li>
                                        <li>화장실 이용, 목욕 보조</li>
                                    </ul>
                                </div>
                                <div className="detail-group">
                                    <strong>가사활동 지원</strong>
                                    <ul>
                                        <li>취사, 청소, 세탁</li>
                                        <li>생필품 구매</li>
                                        <li>말벗, 정서 지원</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge">급여 서비스</div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">🛁</div>
                            <h3>방문목욕</h3>
                            <p className="service-desc">목욕장비를 갖춘 전문 차량으로 가정을 방문하여 안전하고 쾌적한 목욕 서비스를 제공합니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>서비스 내용</strong>
                                    <ul>
                                        <li>차량 내 또는 가정 실내 목욕</li>
                                        <li>목욕 전·후 건강 상태 확인</li>
                                        <li>목욕 후 기본 피부관리</li>
                                        <li>안전사고 예방 전담 관리</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge">급여 서비스</div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">🏥</div>
                            <h3>병원동행 지원</h3>
                            <p className="service-desc">어르신이 병원 진료가 필요하실 때 안전하게 동행하여 이동 및 진료 지원을 도와드립니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>지원 내용</strong>
                                    <ul>
                                        <li>병원 이동 동행</li>
                                        <li>진료 접수·수납 도움</li>
                                        <li>처방전·약 수령 지원</li>
                                        <li>귀가 동행</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge highlight">특화 서비스</div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">📋</div>
                            <h3>장기요양 등급신청 대행</h3>
                            <p className="service-desc">복잡한 장기요양 등급 신청 절차를 센터에서 무료로 대행해 드립니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>지원 내용</strong>
                                    <ul>
                                        <li>등급신청 서류 준비 지원</li>
                                        <li>공단 조사 동행 (요청 시)</li>
                                        <li>등급 결과 확인 및 상담</li>
                                        <li>이의신청 안내</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge highlight">무료 지원</div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">❤️</div>
                            <h3>재가노인지원 서비스</h3>
                            <p className="service-desc">장기요양 등급 외 어르신을 위한 지역사회 돌봄 서비스를 제공합니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>지원 내용</strong>
                                    <ul>
                                        <li>안전 확인 및 안부 전화</li>
                                        <li>생활지원 서비스</li>
                                        <li>사례관리 및 위기 지원</li>
                                        <li>지역사회 자원 연계</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge">지역사회 연계</div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">🧠</div>
                            <h3>치매 어르신 특별 케어</h3>
                            <p className="service-desc">치매 전문 교육을 받은 요양보호사가 인지기능 향상 프로그램을 함께 진행합니다.</p>
                            <div className="service-details">
                                <div className="detail-group">
                                    <strong>프로그램</strong>
                                    <ul>
                                        <li>인지활동 프로그램</li>
                                        <li>회상 요법, 원예치료</li>
                                        <li>치매 가족 교육 연계</li>
                                        <li>치매안심센터 연계</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="service-badge highlight">특화 프로그램</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 3. 직원 현황 ===== */}
            <section id="staff" className="hana-section staff-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">03 / 직원현황</span>
                        <h2>전문 인력 구성 현황</h2>
                        <p className="section-desc">자격을 갖춘 전문 인력이 체계적으로 서비스를 제공합니다. (2026년 2월 기준)</p>
                    </div>

                    <div className="staff-table-wrapper">
                        <table className="staff-table">
                            <thead>
                                <tr>
                                    <th>직종</th>
                                    <th>정원</th>
                                    <th>현원</th>
                                    <th>자격 기준</th>
                                    <th>주요 업무</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="job-title">시설장 (센터장)</td>
                                    <td>1명</td>
                                    <td>1명</td>
                                    <td>사회복지사 1급 또는 의료·간호 관련 자격</td>
                                    <td>기관 총괄 운영 관리</td>
                                </tr>
                                <tr>
                                    <td className="job-title">사회복지사</td>
                                    <td>1명</td>
                                    <td>1명</td>
                                    <td>사회복지사 자격증 소지</td>
                                    <td>사례관리, 급여 계획 수립, 모니터링</td>
                                </tr>
                                <tr>
                                    <td className="job-title">요양보호사</td>
                                    <td>25명</td>
                                    <td>25명</td>
                                    <td>요양보호사 자격증 소지</td>
                                    <td>방문요양, 방문목욕, 일상생활 지원</td>
                                </tr>
                                <tr>
                                    <td className="job-title">간호조무사 (필요 시)</td>
                                    <td>—</td>
                                    <td>—</td>
                                    <td>간호조무사 자격증 소지</td>
                                    <td>건강 관리, 투약 관리 지원</td>
                                </tr>
                                <tr>
                                    <td className="job-title">사무원</td>
                                    <td>1명</td>
                                    <td>1명</td>
                                    <td>—</td>
                                    <td>행정 업무, 급여 청구 관리</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="table-note">※ 직원 배치 기준은 노인장기요양보험법 시행규칙에 따릅니다. 자세한 자격증 사항은 방문 또는 전화 문의 바랍니다.</p>

                    {/* 교육 및 자격 관리 */}
                    <div className="training-info">
                        <h3>📚 직원 교육 및 자격 관리</h3>
                        <div className="training-grid">
                            <div className="training-item">
                                <span className="t-icon">🎓</span>
                                <strong>정기 보수교육</strong>
                                <p>요양보호사 연간 8시간 이상 보수교육 이수 관리</p>
                            </div>
                            <div className="training-item">
                                <span className="t-icon">🛡️</span>
                                <strong>인권 교육</strong>
                                <p>노인 인권 보호 교육 연 1회 이상 의무 이수</p>
                            </div>
                            <div className="training-item">
                                <span className="t-icon">🦠</span>
                                <strong>감염병 예방 교육</strong>
                                <p>감염 예방 및 관리 교육 정기 실시</p>
                            </div>
                            <div className="training-item">
                                <span className="t-icon">🧯</span>
                                <strong>안전 교육</strong>
                                <p>소방 안전 및 응급처치 교육 연 1회 이상</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 4. 이용요금 ===== */}
            <section id="fees" className="hana-section fees-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">04 / 이용요금</span>
                        <h2>장기요양급여 이용요금 안내</h2>
                        <p className="section-desc">2025년 장기요양급여 수가를 기준으로 합니다. 본인부담금은 등급에 따라 다를 수 있습니다.</p>
                    </div>

                    {/* 방문요양 수가 */}
                    <div className="fee-card">
                        <h3>🏠 방문요양 급여 비용</h3>
                        <div className="fee-table-wrapper">
                            <table className="fee-table">
                                <thead>
                                    <tr>
                                        <th>급여 유형</th>
                                        <th>서비스 시간</th>
                                        <th>총 급여 비용</th>
                                        <th>본인부담금 (15%)</th>
                                        <th>국비 부담 (85%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan={5}>방문요양</td>
                                        <td>30분 이상 ~ 1시간 미만</td>
                                        <td>14,870원</td>
                                        <td>2,231원</td>
                                        <td>12,639원</td>
                                    </tr>
                                    <tr>
                                        <td>1시간 이상 ~ 2시간 미만</td>
                                        <td>22,310원</td>
                                        <td>3,347원</td>
                                        <td>18,963원</td>
                                    </tr>
                                    <tr>
                                        <td>2시간 이상 ~ 3시간 미만</td>
                                        <td>29,740원</td>
                                        <td>4,461원</td>
                                        <td>25,279원</td>
                                    </tr>
                                    <tr>
                                        <td>3시간 이상 ~ 4시간 미만</td>
                                        <td>37,180원</td>
                                        <td>5,577원</td>
                                        <td>31,603원</td>
                                    </tr>
                                    <tr>
                                        <td>4시간 이상</td>
                                        <td>44,620원</td>
                                        <td>6,693원</td>
                                        <td>37,927원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="fee-note">※ 위 금액은 장기요양 1~2등급 기준이며, 등급에 따라 상이할 수 있습니다.</p>
                        <p className="fee-note">※ 기초생활수급자, 의료급여수급자는 본인부담금이 면제 또는 감경될 수 있습니다.</p>
                    </div>

                    {/* 비급여 항목 */}
                    <div className="fee-card non-benefit">
                        <h3>💳 비급여 대상 및 비용</h3>
                        <p>아래 항목은 장기요양보험이 적용되지 않는 비급여 항목입니다.</p>
                        <div className="non-benefit-grid">
                            <div className="nb-item">
                                <strong>이동 지원 (차량)</strong>
                                <span>실비 정산 (협의)</span>
                            </div>
                            <div className="nb-item">
                                <strong>명절 선물 등</strong>
                                <span>해당 없음</span>
                            </div>
                            <div className="nb-item">
                                <strong>추가 가사 지원</strong>
                                <span>별도 협의</span>
                            </div>
                        </div>
                        <p className="fee-note">※ 비급여 항목 발생 시 사전에 이용자(보호자)와 반드시 협의 후 진행합니다.</p>
                    </div>
                </div>
            </section>

            {/* ===== 5. 이용절차 ===== */}
            <section id="process" className="hana-section process-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">05 / 이용절차</span>
                        <h2>서비스 이용 절차</h2>
                        <p className="section-desc">간단한 절차로 장기요양서비스를 이용하실 수 있습니다.</p>
                    </div>

                    <div className="process-steps">
                        {[
                            { step: 'STEP 1', icon: '📞', title: '상담 신청', desc: '전화 또는 방문으로 서비스 상담을 신청하시면 담당 사회복지사가 친절히 안내해 드립니다.' },
                            { step: 'STEP 2', icon: '📝', title: '장기요양 등급 신청', desc: '국민건강보험공단에 장기요양 등급 신청서를 제출합니다. 센터에서 대행 지원 가능합니다.' },
                            { step: 'STEP 3', icon: '🔍', title: '방문 조사', desc: '공단 직원이 가정에 방문하여 어르신의 심신 상태를 조사합니다.' },
                            { step: 'STEP 4', icon: '📋', title: '등급 판정', desc: '등급판정위원회에서 1~5등급 또는 인지지원등급을 결정합니다. (신청 후 약 30일 소요)' },
                            { step: 'STEP 5', icon: '🤝', title: '표준장기요양이용계획서 수령', desc: '공단에서 발급한 이용계획서를 수령합니다.' },
                            { step: 'STEP 6', icon: '📄', title: '급여 계약 체결', desc: '하나재가노인복지센터와 장기요양급여 이용 계약을 체결합니다.' },
                            { step: 'STEP 7', icon: '🌟', title: '개인별 서비스 계획 수립', desc: '어르신의 상태와 욕구를 반영한 개인별 서비스 제공 계획을 수립합니다.' },
                            { step: 'STEP 8', icon: '✅', title: '서비스 제공 시작', desc: '계획에 따라 방문요양 서비스가 시작됩니다. 정기적인 모니터링과 상담이 진행됩니다.' },
                        ].map((item, idx) => (
                            <div className="process-step" key={idx}>
                                <div className="step-num">{item.step}</div>
                                <div className="step-icon">{item.icon}</div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                                {idx < 7 && <div className="step-arrow">▼</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 6. 이용자 권리 & 운영 규정 ===== */}
            <section id="rights" className="hana-section rights-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">06 / 이용자 권리</span>
                        <h2>이용자 권리 선언 및 운영 규정</h2>
                        <p className="section-desc">하나재가노인복지센터는 어르신의 존엄과 권리를 최우선으로 합니다.</p>
                    </div>

                    {/* 이용자 권리 선언 */}
                    <div className="rights-card">
                        <h3>🏅 이용자 권리 선언</h3>
                        <div className="rights-grid">
                            {[
                                { num: '01', title: '존엄 받을 권리', desc: '어르신은 인간으로서의 존엄과 가치를 존중받아야 합니다.' },
                                { num: '02', title: '자기결정권', desc: '서비스 이용에 관한 모든 사항은 어르신 본인의 의사를 최대한 존중합니다.' },
                                { num: '03', title: '정보 접근권', desc: '서비스 내용, 이용요금, 기관 운영에 관한 정보를 제공받을 권리가 있습니다.' },
                                { num: '04', title: '비밀 보장권', desc: '개인 및 의료 정보는 엄격히 보호되며 동의 없이 외부에 공개되지 않습니다.' },
                                { num: '05', title: '안전 보호권', desc: '서비스 제공 중 발생하는 모든 안전사고로부터 보호받을 권리가 있습니다.' },
                                { num: '06', title: '불만 제기권', desc: '서비스에 불만이 있을 경우 이의신청 및 고충 처리를 요구할 수 있습니다.' },
                            ].map((r) => (
                                <div className="right-item" key={r.num}>
                                    <span className="right-num">{r.num}</span>
                                    <strong>{r.title}</strong>
                                    <p>{r.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 고충처리 */}
                    <div className="complaint-section">
                        <h3>📣 고충처리 및 의견 수렴 절차</h3>
                        <div className="complaint-grid">
                            <div className="comp-item">
                                <strong>센터 직접 신청</strong>
                                <p>방문, 전화, 서면으로 고충 신청 → 담당자 접수 → 7일 이내 처리 및 결과 통보</p>
                            </div>
                            <div className="comp-item">
                                <strong>국민건강보험공단</strong>
                                <p>장기요양 고객센터: ☎ 1577-1000</p>
                            </div>
                            <div className="comp-item">
                                <strong>노인장기요양보험 민원</strong>
                                <p>보건복지부 복지포털 또는 국민신문고 (www.epeople.go.kr)</p>
                            </div>
                            <div className="comp-item">
                                <strong>서울시 어르신돌봄 상담</strong>
                                <p>서울시 돌봄SOS센터: ☎ 02-120</p>
                            </div>
                        </div>
                    </div>

                    {/* 개인정보처리방침 요약 */}
                    <div className="privacy-section">
                        <h3>🔐 개인정보 처리방침 (요약)</h3>
                        <div className="privacy-content">
                            <p><strong>수집 항목:</strong> 성명, 주소, 연락처, 생년월일, 장기요양 등급, 건강 상태 등</p>
                            <p><strong>수집 목적:</strong> 재가서비스 제공, 급여 청구, 서비스 모니터링</p>
                            <p><strong>보유 기간:</strong> 서비스 종료 후 5년 (관계 법령에 따름)</p>
                            <p><strong>제3자 제공:</strong> 국민건강보험공단 급여 청구 목적에 한하여 제공 (동의 후)</p>
                            <p>개인정보 처리에 관한 상세 사항은 방문 또는 전화로 문의하시기 바랍니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 7. 공지사항 / FAQ ===== */}
            <section id="notice" className="hana-section notice-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">07 / 공지사항</span>
                        <h2>공지사항 및 자주 묻는 질문</h2>
                    </div>

                    <div className="notice-faq-grid">
                        {/* 공지사항 */}
                        <div className="notice-board">
                            <h3>📢 공지사항</h3>
                            <ul className="notice-list">
                                <li>
                                    <span className="notice-badge new">NEW</span>
                                    <span className="notice-title">2026년 장기요양수가 변경 안내</span>
                                    <span className="notice-date">2026.01.15</span>
                                </li>
                                <li>
                                    <span className="notice-badge">공지</span>
                                    <span className="notice-title">설 연휴 서비스 운영 안내 (2.12~2.14)</span>
                                    <span className="notice-date">2026.02.01</span>
                                </li>
                                <li>
                                    <span className="notice-badge">공지</span>
                                    <span className="notice-title">개인정보처리방침 개정 안내</span>
                                    <span className="notice-date">2025.12.01</span>
                                </li>
                                <li>
                                    <span className="notice-badge">안내</span>
                                    <span className="notice-title">요양보호사 정기 보수교육 실시 결과</span>
                                    <span className="notice-date">2025.11.20</span>
                                </li>
                                <li>
                                    <span className="notice-badge">안내</span>
                                    <span className="notice-title">동절기 낙상 예방 캠페인 운영 안내</span>
                                    <span className="notice-date">2025.11.01</span>
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div className="faq-board">
                            <h3>❓ 자주 묻는 질문 (FAQ)</h3>
                            <div className="faq-list">
                                {[
                                    { q: '장기요양등급 신청은 어떻게 하나요?', a: '국민건강보험공단(1577-1000)에 신청하거나, 저희 센터에서 무료로 대행해 드립니다. 방문 또는 전화로 상담해 주세요.' },
                                    { q: '요양보호사는 주말에도 방문하나요?', a: '네, 요양보호사는 주 7일 방문 가능합니다. 다만, 공휴일 방문 여부는 계약 시 협의합니다.' },
                                    { q: '가족이 요양보호사를 직접 선택할 수 있나요?', a: '가능한 한 선호하시는 요양보호사를 배정하도록 노력하나, 최종 배정은 센터 상황에 따라 결정됩니다.' },
                                    { q: '요양보호사가 마음에 들지 않으면 교체 가능한가요?', a: '네, 담당 사회복지사에게 말씀해 주시면 교체를 위해 최선을 다하겠습니다.' },
                                    { q: '서비스 중 사고가 발생하면 어떻게 되나요?', a: '저희 센터는 배상책임보험에 가입되어 있으며, 사고 발생 즉시 보고 및 처리 절차를 이행합니다.' },
                                ].map((faq, idx) => (
                                    <div className="faq-item" key={idx}>
                                        <div className="faq-q">Q. {faq.q}</div>
                                        <div className="faq-a">A. {faq.a}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 8. 오시는 길 / 연락처 ===== */}
            <section id="contact" className="hana-section contact-section">
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">08 / 오시는길</span>
                        <h2>찾아오시는 길 및 연락처</h2>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-info-card">
                            <h3>📍 센터 위치</h3>
                            <div className="contact-details">
                                <div className="c-detail">
                                    <span className="c-icon">🏢</span>
                                    <div>
                                        <strong>주소</strong>
                                        <p>서울시 동작구 성대로29길 59(1층)</p>
                                    </div>
                                </div>
                                <div className="c-detail">
                                    <span className="c-icon">📞</span>
                                    <div>
                                        <strong>전화번호</strong>
                                        <p>02-822-6220</p>
                                    </div>
                                </div>
                                <div className="c-detail">
                                    <span className="c-icon">📠</span>
                                    <div>
                                        <strong>팩스번호</strong>
                                        <p>02-822-6225</p>
                                    </div>
                                </div>
                                <div className="c-detail">
                                    <span className="c-icon">📧</span>
                                    <div>
                                        <strong>이메일</strong>
                                        <p>shgo2004@hanmail.net</p>
                                    </div>
                                </div>
                                <div className="c-detail">
                                    <span className="c-icon">⏰</span>
                                    <div>
                                        <strong>운영 시간</strong>
                                        <p>월~토 09:00 ~ 18:00<br />(공휴일 휴무, 긴급 상담 가능)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="transport-info">
                                <h4>🚌 대중교통 안내</h4>
                                <div className="transport-item">
                                    <strong>지하철</strong>
                                    <p>장승배기역 3번 출구 500m / 도보 7분</p>
                                </div>
                                <div className="transport-item">
                                    <strong>버스</strong>
                                    <p>상도초등학교 입구 하차<br />간선 152번, 504번 / 지선 5516, 5536, 6515</p>
                                </div>
                            </div>
                        </div>

                        <div className="map-section">
                            <div className="map-placeholder">
                                <div className="map-content">
                                    <div className="map-pin">📍</div>
                                    <p><strong>하나재가노인복지센터</strong></p>
                                    <p>서울시 동작구 성대로29길 59(1층)</p>
                                    <a
                                        href="https://map.naver.com/v5/search/서울시 동작구 성대로29길 59"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-link"
                                    >
                                        네이버 지도에서 보기 →
                                    </a>
                                </div>
                            </div>

                            {/* 온라인 상담 폼 */}
                            <div className="consult-form">
                                <h4>💬 온라인 상담 신청</h4>
                                {formStatus === 'success' ? (
                                    <div className="form-success">
                                        <div className="success-icon">✅</div>
                                        <strong>상담 신청이 접수되었습니다!</strong>
                                        <p>담당자가 빠른 시간 내 연락드리겠습니다.</p>
                                        <button className="submit-btn" onClick={() => setFormStatus('idle')}>다시 신청하기</button>
                                    </div>
                                ) : (
                                    <form
                                        name="consultation"
                                        method="POST"
                                        data-netlify="true"
                                        onSubmit={handleConsultSubmit}
                                    >
                                        <input type="hidden" name="form-name" value="consultation" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="성함 *"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="연락처 * (010-XXXX-XXXX)"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">상담 분야 선택</option>
                                            <option value="장기요양 등급 신청">장기요양 등급 신청</option>
                                            <option value="방문요양 서비스">방문요양 서비스</option>
                                            <option value="방문목욕 서비스">방문목욕 서비스</option>
                                            <option value="이용요금 문의">이용요금 문의</option>
                                            <option value="기타 문의">기타 문의</option>
                                        </select>
                                        <textarea
                                            name="message"
                                            placeholder="문의 내용을 간단히 적어주세요."
                                            rows={3}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                        <div className="privacy-agree">
                                            <input type="checkbox" id="agree" required />
                                            <label htmlFor="agree">개인정보 수집·이용에 동의합니다 (필수)</label>
                                        </div>
                                        {formStatus === 'error' && (
                                            <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '8px' }}>
                                                ⚠️ 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                                            </p>
                                        )}
                                        <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                                            {formStatus === 'submitting' ? '전송 중...' : '상담 신청하기'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="hana-footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-logo">
                            <span className="f-logo-icon">🌿</span>
                            <div>
                                <strong>하나재가노인복지센터</strong>
                                <span>Hana Senior Care Center</span>
                            </div>
                        </div>
                        <div className="footer-links">
                            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>센터소개</a>
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>서비스안내</a>
                            <a href="#fees" onClick={(e) => { e.preventDefault(); scrollTo('fees'); }}>이용요금</a>
                            <a href="#rights" onClick={(e) => { e.preventDefault(); scrollTo('rights'); }}>이용자권리</a>
                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>오시는길</a>
                        </div>
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-info">
                        <p>
                            <strong>하나재가노인복지센터</strong>&nbsp;|&nbsp;
                            대표자: 고시환&nbsp;|&nbsp;
                            사업자등록번호: 142-80-38971&nbsp;|&nbsp;
                            장기요양기관번호: 2-11590-00250
                        </p>
                        <p>
                            주소: 서울시 동작구 성대로29길 59(1층)&nbsp;|&nbsp;
                            전화: 02-822-6220&nbsp;|&nbsp;
                            팩스: 02-822-6225&nbsp;|&nbsp;
                            이메일: shgo2004@hanmail.net
                        </p>
                        <p>노인복지법 제38조 근거&nbsp;|&nbsp;감독기관: 동작구청 어르신정책과</p>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 하나재가노인복지센터. All rights reserved.</p>
                        <div className="footer-related">
                            <a href="https://www.longtermcare.or.kr" target="_blank" rel="noopener noreferrer">국민건강보험공단 장기요양</a>
                            <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer">보건복지부</a>
                            <a href="https://www.epeople.go.kr" target="_blank" rel="noopener noreferrer">국민신문고</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default HanaHome;
