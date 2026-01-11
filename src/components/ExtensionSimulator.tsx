import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Linkedin, Twitter, Mic, Check, Circle } from 'lucide-react';

export function ExtensionSimulator() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setCaptureComplete(true);
      setTimeout(() => setCaptureComplete(false), 3000);
    }, 1500);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate voice to text
      setVoiceInput(voiceInput + ' [음성 입력이 여기에 표시됩니다]');
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Chrome Extension 시뮬레이터</CardTitle>
          <CardDescription>
            실제 Chrome Extension에서 동작할 캡처 인터페이스 미리보기
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Extension UI Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LinkedIn Post Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-600" />
              LinkedIn 포스트 예시
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mock LinkedIn Post */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  SC
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Dr. Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">@sarahchen • 2h ago</p>
                </div>
              </div>
              
              <p className="text-sm mb-3">
                Exciting breakthrough in quantum computing! Our research team has achieved 
                unprecedented accuracy in quantum error correction. This could accelerate 
                practical quantum applications by 5-10 years. Paper link in comments.
              </p>

              <div className="flex gap-2">
                <Badge variant="outline">Quantum Computing</Badge>
                <Badge variant="outline">Research</Badge>
              </div>
            </div>

            {/* Extension Overlay */}
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Insight Capture Extension</p>
                <div className={`w-3 h-3 rounded-full ${
                  isCapturing ? 'bg-blue-600 animate-pulse' :
                  captureComplete ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              </div>

              <Button 
                onClick={handleCapture}
                disabled={isCapturing}
                className="w-full mb-3"
              >
                {captureComplete ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    캡처 완료!
                  </>
                ) : isCapturing ? (
                  <>
                    <Circle className="w-4 h-4 mr-2 animate-spin" />
                    캡처 중...
                  </>
                ) : (
                  '포스트 캡처'
                )}
              </Button>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">음성 메모 추가</label>
                  <Button
                    size="sm"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={handleVoiceRecord}
                  >
                    <Mic className={`w-4 h-4 mr-1 ${isRecording ? 'animate-pulse' : ''}`} />
                    {isRecording ? '녹음 중지' : '녹음 시작'}
                  </Button>
                </div>
                
                <Textarea
                  placeholder="음성 메모가 자동으로 텍스트로 변환됩니다..."
                  value={voiceInput}
                  onChange={(e) => setVoiceInput(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {captureComplete && (
                <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-900">
                  ✓ 포스트와 음성 메모가 저장되었습니다!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* X (Twitter) Post Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Twitter className="w-5 h-5 text-blue-400" />
              X (Twitter) 포스트 예시
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mock Twitter Post */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  TI
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Tech Insider</p>
                  <p className="text-sm text-muted-foreground">@techinsider • 5m ago</p>
                </div>
              </div>
              
              <p className="text-sm mb-3">
                🚨 BREAKING: AI startup valued at $10B after secret demo to investors. 
                This will change everything! Get in before it's too late! 🚀🚀🚀
              </p>

              <div className="flex gap-2">
                <Badge variant="outline">AI</Badge>
                <Badge variant="outline">Investment</Badge>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border rounded-lg p-4 bg-slate-50">
              <p className="text-sm font-semibold mb-3">빠른 평가</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                  👍 신뢰함
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                  👎 의심스러움
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Extension 주요 기능</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-sm">원클릭 캡처</p>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn/X 포스트를 클릭 한 번으로 저장. HTML 구조를 자동으로 파싱하여 
                    작성자, 내용, 시간 등을 추출합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-sm">실시간 음성 메모</p>
                  <p className="text-sm text-muted-foreground">
                    포스트를 읽으면서 떠오른 생각을 즉시 음성으로 기록. 
                    Web Speech API를 활용한 실시간 텍스트 변환.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-sm">시각적 피드백</p>
                  <p className="text-sm text-muted-foreground">
                    캡처 상태를 색상으로 표시 (회색→파란색→녹색). 
                    사용자가 저장 여부를 한눈에 확인 가능.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-sm">빠른 평가</p>
                  <p className="text-sm text-muted-foreground">
                    포스트에 대한 즉각적인 평가 (긍정/부정/중립)를 버튼 클릭으로 저장.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-semibold text-sm">자동 태깅</p>
                  <p className="text-sm text-muted-foreground">
                    포스트 내용을 분석하여 자동으로 관련 태그 생성. 
                    사용자가 수동으로 추가/수정 가능.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  6
                </div>
                <div>
                  <p className="font-semibold text-sm">Context Menu 통합</p>
                  <p className="text-sm text-muted-foreground">
                    텍스트 선택 후 우클릭으로 "Capture to Insight Assistant" 옵션 제공.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  7
                </div>
                <div>
                  <p className="font-semibold text-sm">키보드 단축키</p>
                  <p className="text-sm text-muted-foreground">
                    Ctrl/Cmd + Shift + S로 빠른 캡처. 
                    Ctrl/Cmd + Shift + V로 음성 녹음 시작/중지.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  8
                </div>
                <div>
                  <p className="font-semibold text-sm">오프라인 큐</p>
                  <p className="text-sm text-muted-foreground">
                    네트워크가 불안정해도 로컬에 저장 후 연결 시 자동 동기화.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택 & 구현</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Extension 기술</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline">Manifest V3</Badge>
                  <span>최신 Chrome Extension API</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">Content Scripts</Badge>
                  <span>LinkedIn/X 페이지 DOM 접근</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">Web Speech API</Badge>
                  <span>음성 인식 및 변환</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">IndexedDB</Badge>
                  <span>로컬 데이터 저장</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">Chrome Storage</Badge>
                  <span>설정 및 동기화</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Native App 연동</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline">WebSocket</Badge>
                  <span>실시간 동기화</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">REST API</Badge>
                  <span>데이터 전송</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">E2E Encryption</Badge>
                  <span>음성 메모 암호화</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">OAuth 2.0</Badge>
                  <span>사용자 인증</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline">Cloud Queue</Badge>
                  <span>백그라운드 AI 처리</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900">프라이버시 & 보안</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-purple-900">
          <div className="flex items-start gap-2">
            <span>🔒</span>
            <p>
              <strong>음성 데이터:</strong> 로컬 저장 또는 E2E 암호화된 클라우드 저장 중 선택 가능
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span>🔐</span>
            <p>
              <strong>콘텐츠 캡처:</strong> 사용자가 명시적으로 저장한 포스트만 수집
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span>🛡️</span>
            <p>
              <strong>권한 최소화:</strong> 필요한 최소한의 브라우저 권한만 요청
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span>👁️</span>
            <p>
              <strong>투명성:</strong> 수집되는 모든 데이터와 용도를 명확히 공개
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
