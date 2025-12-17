# Contact & Networks

## 01. Connect

> **"Open for Collaboration"** > 새로운 기술 논의와 프로젝트 협업 제안은 언제나 환영합니다.

아래 채널을 통해 연락주시면 최대한 빠르게 답변 드리겠습니다. 기술적인 질문은 GitHub Issue를, 비즈니스나 연구 제안은 이메일을 이용해 주세요.

* ![Email](https://img.shields.io/badge/Email-Gmail-EA4335?style=flat-square&logo=gmail&logoColor=white) **your.email@example.com**
* ![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github&logoColor=white) **[GitHub Profile Link]**
* ![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white) **[LinkedIn Profile Link]**

---

## 02. Communication Protocol

### Preferred Topics
주로 **DeepFake Detection**, **Model Compression**, 그리고 **MLOps Pipeline** 구축에 관한 논의를 선호합니다. 진행 중인 프로젝트의 이슈 트래킹은 해당 리포지토리의 Issue 탭을 활용해 주시면 감사하겠습니다.

### Collaboration Guide
단순한 코드 문의보다는 구체적인 구현 목표와 현재 직면한 문제 상황(Error Logs, Architecture Constraints)을 함께 공유해 주시면 더 생산적인 대화가 가능합니다. 학술적인 연구 협업이나 데이터셋 공유에 관한 제안은 메일 제목에 `[Research]` 태그를 붙여주세요.

---

## 03. Channel Status

현재 제가 확인 가능한 채널별 응답 대기 시간(Latency) 및 상태입니다.

| Channel | Status | Est. Latency | Usage |
| :--- | :--- | :--- | :--- |
| **Email** | ![Active](https://img.shields.io/badge/-Active-success?style=flat-square) | `~ 24 Hours` | 연구 제안, 비즈니스 문의 |
| **GitHub** | ![Active](https://img.shields.io/badge/-Active-success?style=flat-square) | `~ 12 Hours` | 코드 리뷰, 이슈 리포트 |
| **LinkedIn** | ![Slow](https://img.shields.io/badge/-Check%20Weekly-orange?style=flat-square) | `3 Days +` | 네트워킹, 커리어 제안 |

---

## 04. Send Message

```python
import smtplib

def send_inquiry(user, subject, body):
    target = "your.email@example.com"
    
    if not body:
        raise ValueError("Content cannot be empty.")
        
    print(f"Connecting to {target}...")
    # TODO: Implement secure handshake
    print(f"Successfully sent: [{subject}] from {user}")

# Run
send_inquiry(user="Visitor", subject="Project Collaboration", body="Hello!")