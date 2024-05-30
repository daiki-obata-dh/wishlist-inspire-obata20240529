```mermaid
gantt
    title ○○サービススケジュール
    dateFormat  YYYY-MM-DD

    section ﾏｲﾙｽﾄｰﾝ
        実装            : done, milestone, 2023-01-15, 0d
        テスト          : milestone, 2023-02-01, 0d
        リリース        : crit, milestone, 2023-03-01, 0d
    section Aさん
        ○○機能実装    : crit, 2023-01-15, 10d
    section Bさん
        ××機能実装    : done, b1, 2023-01-16, 8d
        △△機能実装    : active, b2, after b1, 6d
    section Cさん
        テスト仕様作成  : crit, active, c1, 2023-01-21, 6d
        ××機能テスト  : c2, 2023-02-01, 7d
        ○○機能テスト  : c3, after c2, 10d
        △△機能テスト  : c4, after c3, 5d
```
